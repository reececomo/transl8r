import { LangJson, Options } from '../types';
import { createObjectCsvWriter } from 'csv-writer';
import { loadJsonFiles } from '../helpers/file';
import { log, logError, logMessage } from '../helpers/logger';
import fs from 'fs';
import { zip } from '../helpers/zip';
import { removeDir } from '../helpers/removeDir';
import { sleep } from '../helpers/sleep';

export const exportTodo = async (options: Options): Promise<void> => {
  const baseJson = loadJsonFiles(options.path, options.baseLang, options.availableNamespaces);
  const namespaces = getNonGeneratedNamespaces(options);
  const outputDir = options.export.outputDir;
  const outputZip = `${outputDir}.zip`;

  let filesAdded = 0;
  let filesUnresolved = 0;

  options.langs.forEach(async lang => {
    const langJson = loadJsonFiles(options.path, lang, namespaces);
    const missingJson = getMissing(baseJson, langJson);
    const missingCount = Object.keys(missingJson).length;

    if (missingCount === 0) return;

    filesUnresolved += 1;

    const langGeneratedJson = options.export.omitGenerated
      ? {}
      : loadJsonFiles(options.path, lang, [options.namespace]);

    const fileName = `${options.group}.${lang}.csv`;
    const filePath = `${outputDir}/${fileName}`;
    const csvHeader = {
      contextKey: 'contextKey',
      [options.baseLang]: options.baseLang,
      [lang]: lang,
    };

    fs.mkdirSync(outputDir, { recursive: true });
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: ['contextKey', options.baseLang, lang],
    });

    const records = Object.entries(missingJson).map(([key, value]) => ({
      contextKey: key,
      [options.baseLang]: value,
      [lang]: langGeneratedJson[key] ?? '',
    }));

    await csvWriter
      .writeRecords([csvHeader, ...records])
      .then(() => {
        filesAdded += 1;
        logMessage(lang, `Extracted ${missingCount} keys (${fileName})`);
      })
      .catch(error => logError(lang, `Failed to generated CSV. ${error}`))
      .finally(() => {
        filesUnresolved -= 1;
      });
  });

  while (filesUnresolved > 0) await sleep(100);

  if (filesAdded === 0) {
    log('Everything up to date ✓');
  } else {
    zip(outputDir, outputZip).then(() => {
      log(`Saved ${outputZip}`);
      removeDir(outputDir);
    });
  }
};

// Assumes "target" namespace is the generated namespace.
const getNonGeneratedNamespaces = (options: Options): string[] => {
  const nonGeneratedNamespaces = options.availableNamespaces;
  const nsIndex = nonGeneratedNamespaces.indexOf(options.namespace);

  if (nsIndex > -1) {
    nonGeneratedNamespaces.splice(nsIndex, 1);
  }

  return nonGeneratedNamespaces;
};

const getMissing = (jsonA: LangJson, jsonB: LangJson): LangJson => {
  const missing: LangJson = {};
  const keysA = Object.keys(jsonA);
  const keysB = Object.keys(jsonB);

  keysA.forEach(key => {
    if (!keysB.includes(key)) {
      missing[key] = jsonA[key] ?? '';
    }
  });

  return missing;
};
