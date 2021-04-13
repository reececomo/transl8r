import { sortJsonFile } from '../helpers/file';
import { Options } from '../types';

export const sort = (options: Options): void => {
  options.langs.forEach(lang => {
    options.availableNamespaces.forEach(ns => sortJsonFile(options.path, lang, ns));
  });

  options.availableNamespaces.forEach(ns => sortJsonFile(options.path, options.baseLang, ns));
};
