import { Options } from '../types';
import { fetchTranslation } from './fetch';
import { loadJsonFile, saveJsonFile } from './file';
import { logMessage } from './logger';

export const writeTranslation = (
  key: string,
  newValue: string,
  lang: string,
  options: Options,
): void => {
  fetchTranslation(newValue, options.baseLang, lang).then(translated => {
    // For fun we're going to sanity-check the translations
    // by returning them to the base language for comparison
    fetchTranslation(translated, lang, options.baseLang).then(sanityCheck => {
      const existingJson = loadJsonFile(options.path, lang, options.namespace);
      const combinedJson = Object.assign(existingJson, { [key]: translated });

      saveJsonFile(options.path, lang, options.namespace, combinedJson);

      if (options.baseLang !== lang) {
        logMessage(lang, translated + '\n' + '→ '.padStart(10) + sanityCheck + '\n');
      }
    });
  });
};
