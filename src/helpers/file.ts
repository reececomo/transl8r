/* eslint-disable @typescript-eslint/no-unsafe-call */
import { readFileSync, writeFileSync } from 'fs';
import sortJson from 'sort-json';
import { LangJson } from '../types';
import { logMessage } from './logger';

const getFilePath = (path: string, langCode: string, namespace: string) =>
  path.replace(/{{lang}}/gi, langCode).replace(/{{namespace}}/, namespace);

export const loadJsonFile = (path: string, langCode: string, namespace: string): LangJson => {
  const file = getFilePath(path, langCode, namespace);

  try {
    const data = readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
};

export const loadJsonFiles = (path: string, language: string, namespaces: string[]): LangJson =>
  namespaces.reduce((combined, namespace) => {
    try {
      const json = loadJsonFile(path, language, namespace);
      return { ...combined, ...json };
    } catch (err) {
      logMessage(language, `Skipping load for namespace: ${namespace} (${err})`);
      return combined;
    }
  }, {});

export const saveJsonFile = (
  path: string,
  langCode: string,
  namespace: string,
  json: LangJson,
): void => {
  const file = getFilePath(path, langCode, namespace);
  writeFileSync(file, JSON.stringify(sortJson(json), null, 2) + '\n');
};

export const sortJsonFile = (path: string, langCode: string, namespace: string): void => {
  const file = getFilePath(path, langCode, namespace);

  try {
    sortJson.overwrite(file);
  } catch (err) {
    // Probably file does not exist.
  }
};
