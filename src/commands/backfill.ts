import { fetchTranslations } from '../helpers/fetch';
import { loadJsonFile, loadJsonFiles, saveJsonFile } from '../helpers/file';
import { logMessage } from '../helpers/logger';
import { Options } from '../types';

export const backfill = (options: Options): void => {
  options.langs.forEach(lang => backfillTranslations(lang, options));
};

const backfillTranslations = (lang: string, options: Options): void => {
  const baseLangJson = loadJsonFiles(options.path, options.baseLang, options.availableNamespaces);
  const baseLangKeys = Object.keys(baseLangJson);

  const existingLangKeys = Object.keys(
    loadJsonFiles(options.path, lang, options.availableNamespaces),
  );

  const existingLangDestinationJson = loadJsonFile(options.path, lang, options.namespace);

  const missingKeys = baseLangKeys.filter(key => !existingLangKeys.includes(key));

  if (missingKeys.length === 0) {
    logMessage(lang, 'Up to date ✓');
    return;
  }

  logMessage(lang, `Fetching ${missingKeys.length} missing key(s).`);

  fetchTranslations(baseLangJson, missingKeys, options.baseLang, lang).then(newTranslations => {
    const newCount: number = Object.keys(newTranslations).length;
    const combinedJson = Object.assign(newTranslations, existingLangDestinationJson);

    logMessage(lang, `${newCount} key(s) added.`);
    saveJsonFile(options.path, lang, options.namespace, combinedJson);
  });
};
