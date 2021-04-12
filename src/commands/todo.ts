import { LangJson, Options } from '../types';
import { createObjectCsvWriter } from 'csv-writer';
import { loadJsonFiles } from '../helpers/file';
import { log, logMessage } from '../helpers/logger';
import fs from 'fs';
import { zip } from '../helpers/zip';
import { removeDir } from '../helpers/removeDir';

export const todo = (options: Options): void => {
  const baseJson = loadJsonFiles(options.path, options.baseLang, options.availableNamespaces);
  const namespaces = getNonGeneratedNamespaces(options);
  const outputDir = options.outputDir;
  const outputZip = `${options.outputDir}.zip`;

  options.langs.forEach(lang => {
    const langJson = loadJsonFiles(options.path, lang, namespaces);
    const missingJson = getMissing(baseJson, langJson);
    const missingCount = Object.keys(missingJson).length;

    if (missingCount === 0) {
      logMessage(lang, 'No keys awaiting translation.');
      return;
    }

    const filePath = `${outputDir}/${options.group}.${lang}.csv`;

    fs.mkdirSync(outputDir, { recursive: true });
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: ['contextKey', options.baseLang, lang],
    });

    const records = Object.entries(missingJson).map(([key, value]) => ({
      contextKey: key,
      [options.baseLang]: value,
      [lang]: '',
    }));

    csvWriter.writeRecords(records).then(() => {
      logMessage(lang, `...extracted ${missingCount} keys: ${filePath}`);
    });
  });

  zip(outputDir, outputZip).then(() => {
    log(`Saved ${outputZip}`);
    removeDir(outputDir);
  });
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
