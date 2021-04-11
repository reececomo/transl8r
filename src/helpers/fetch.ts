import { Translate, TranslateRequest } from '@google-cloud/translate/build/src/v2';
import { config, Dict } from '../config';
import { preparePlaceholders, resolvePlaceholders } from './placeholders';

const translate = async (text: string, options: TranslateRequest): Promise<string> => {
  const client = new Translate({
    keyFilename: config.googleTranslateKeyFile,
  });

  const [translation] = await client.translate(text, options);

  return translation;
};

export const fetchTranslation = async (
  original: string,
  baseLang: string,
  newLang: string,
): Promise<string> => {
  if (baseLang === newLang) {
    return original;
  }

  const before = preparePlaceholders(original);

  const translation = await translate(before, {
    from: baseLang,
    to: newLang,
  });

  return resolvePlaceholders(translation);
};

// Translate some subset of keys from the base JSON into the new language.
export const fetchTranslations = async (
  baseJson: Dict,
  keysToTranslate: string[],
  baseLang: string,
  newLang: string,
): Promise<Dict> =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  new Promise((resolve, reject) => {
    Promise.all(
      keysToTranslate.map(async key => ({
        [key]: await fetchTranslation(baseJson[key] ?? '', baseLang, newLang),
      })),
    )
      .then(data => resolve(Object.assign({}, ...data)))
      .catch(error => reject(error));
  }) as Promise<Dict>;
