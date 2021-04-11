import prompt from 'prompt';
import { writeTranslation } from '../helpers/writeTranslation';
import { Options } from '../types';

export const alt = (key: string, options: Options): void => {
  prompt.get(['translateAs'], (_: Error | null, input: { translateAs: string }) => {
    options.langs.forEach(lang => writeTranslation(key, input.translateAs, lang, options));
  });
};
