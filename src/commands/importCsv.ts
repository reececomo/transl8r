import { LangJson, Options } from '../types';
import fs from 'fs';
import csv from 'csv-parser';
import prompt from 'prompt';
import { getFilePath, loadJsonFile, saveJsonFile } from '../helpers/file';
import { log, logMessage } from '../helpers/logger';

export const importCsv = async (file: string, options: Options): Promise<void> => {
  await readCsv(file).then(async csvData => {
    const count = Object.keys(csvData.data).length;

    if (count === 0) {
      logMessage(csvData.lang, 'No strings to import.');
      return;
    }

    await prompt.get(['namespace'], async (_: Error | null, input: { namespace: string }) => {
      const namespace = input.namespace.length > 0 ? input.namespace : options.namespace;
      const existingJson = loadJsonFile(options.path, csvData.lang, namespace);

      saveJsonFile(options.path, csvData.lang, namespace, {
        ...existingJson,
        ...csvData.data,
      });

      const filePath = getFilePath(options.path, csvData.lang, namespace);
      logMessage(csvData.lang, `Imported ${count} strings to: ${filePath}`);
    });
  });
};

interface LangCsvData {
  lang: string;
  data: LangJson;
}

const readCsv = async (file: string): Promise<LangCsvData> =>
  new Promise<LangCsvData>((resolve, reject) => {
    let lang: string;
    const data: LangJson = {};

    fs.createReadStream(file)
      .pipe(csv())
      .on('headers', (headers: string[]) => {
        lang = (headers[2] ?? headers[1] ?? '').trim();
        log(`Language detected as: ${lang}`);
      })
      .on('data', (row: { [k: string]: string }) => {
        const key: string = (row['contextKey'] ?? '').trim();
        const value: string = (row[lang] ?? '').trim();

        if (key.length === 0) {
          reject('Invalid row - contextKey was blank.');
        } else if (key.match(/^[a-zA-Z0-9.-_]+$/) === null) {
          reject(`Invalid row - contextKey contained invalid characters: ${key}.`);
        } else if (value.length === 0) {
          log('Skipping row - value was blank.');
          return;
        }

        data[key] = value;
      })
      .on('end', () => resolve({ lang, data }));
  });
