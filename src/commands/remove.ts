import { loadJsonFile, saveJsonFile } from '../helpers/file';
import { logMessage } from '../helpers/logger';
import { Options } from '../types';

export const remove = (key: string, options: Options): void => {
  options.langs.forEach(lang => removeKey(key, lang, options));
  removeKey(key, options.baseLang, options);
};

export const removeKey = (key: string, lang: string, options: Options): void => {
  const existingJson = loadJsonFile(options.path, lang, options.namespace);

  if (existingJson[key]) {
    delete existingJson[key];

    saveJsonFile(options.path, lang, options.namespace, existingJson);
    logMessage(lang, 'Purged key ✓');
  } else {
    logMessage(lang, 'Key not found.');
  }
};
