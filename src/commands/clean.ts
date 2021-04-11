import { loadJsonFile, loadJsonFiles, saveJsonFile } from '../helpers/file';
import { logMessage } from '../helpers/logger';
import { Options } from '../types';

export const clean = (options: Options): void => {
  options.langs.forEach(lang => removeExistingStringsFromDestinationStrings(lang, options));
};

export const removeExistingStringsFromDestinationStrings = (
  lang: string,
  options: Options,
): void => {
  const namespaces = searchNamespacesExcludingDestination(
    options.availableNamespaces,
    options.namespace,
  );

  const existingKeys = Object.keys(loadJsonFiles(options.path, lang, namespaces));
  const existingDestinationJson = loadJsonFile(options.path, lang, options.namespace);
  const beforeCount = Object.keys(existingDestinationJson).length;

  const newJson = existingDestinationJson;
  existingKeys.forEach(k => delete newJson[k]);
  const removedCount = beforeCount - Object.keys(newJson).length;

  if (removedCount === 0) {
    logMessage(lang, 'Up to date ✓');
    return;
  }

  logMessage(lang, `Purged ${removedCount} unreachable key(s).`);
  saveJsonFile(options.path, lang, options.namespace, newJson);
};

const searchNamespacesExcludingDestination = (
  searchNamespaces: string[],
  destinationNamespace: string,
) => {
  const index = searchNamespaces.indexOf(destinationNamespace);

  if (index !== -1) {
    searchNamespaces.splice(index, 1);
  }

  return searchNamespaces;
};
