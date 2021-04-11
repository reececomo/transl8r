import prompt from 'prompt';
import { writeTranslation } from '../helpers/writeTranslation';
import { Options } from '../types';

export const add = (key: string, options: Options): void => {
  prompt.get(['value'], (_: Error | null, input: { value: string }) => {
    options.langs.forEach(lang => writeTranslation(key, input.value, lang, options));
    writeTranslation(key, input.value, options.baseLang, options);
  });
};
