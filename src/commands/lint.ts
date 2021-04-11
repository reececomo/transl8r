import { loadJsonFiles } from '../helpers/file';
import { log } from '../helpers/logger';
import { LangJson, Options } from '../types';

const MARKUP_REGEX = /<(\/?[0-9]+\/?)>/g;
const LARAVEL_VAR_REGEX = /(:[a-zA-Z0-9_]+)/g;
const I18NEXT_VAR_REGEX = /({{[a-zA-Z0-9_]+}})/g;

type PatternType = 'markup tags' | 'placeholders';

export const lint = (options: Options): void => {
  const baseJson = loadJsonFiles(options.path, options.baseLang, options.availableNamespaces);
  const baseKeys = Object.keys(baseJson);
  let errors: string[] = [];

  options.langs.forEach(lang => {
    const langJson = loadJsonFiles(options.path, lang, options.availableNamespaces);
    const langKeys = Object.keys(langJson);

    errors = [
      ...errors,
      ...validateKeys(baseKeys, lang, langKeys),
      ...validateRule(baseJson, lang, langJson, 'markup tags', MARKUP_REGEX, options),
      ...validateRule(baseJson, lang, langJson, 'placeholders', I18NEXT_VAR_REGEX, options),
      ...validateRule(baseJson, lang, langJson, 'placeholders', LARAVEL_VAR_REGEX, options),
    ];
  });

  if (errors.length > 0) {
    const failMessage = `Failed to validate, there were ${errors.length} errors`;
    log(`${failMessage}:`);
    errors.forEach(error => log(error));
    throw failMessage;
  }

  log('Validated.');
};

const validateKeys = (baseKeys: string[], lang: string, langKeys: string[]): string[] => {
  const errors: string[] = [];

  if (JSON.stringify(baseKeys) !== JSON.stringify(langKeys)) {
    const missingKeys = getMissing(baseKeys, langKeys);
    const missingCount = missingKeys.length;
    const missingString = missingKeys.map(k => ` - missing: "${k}"`).join('\n');
    const extraKeys = getMissing(langKeys, baseKeys);
    const extraString = extraKeys.map(k => ` - extra: "${k}"`).join('\n');
    const extraCount = extraKeys.length;

    if (missingCount > 0) {
      errors.push(`${lang}: Missing ${missingCount} expected entries.\n${missingString}`);
    }

    if (extraCount > 0) {
      errors.push(`${lang}: Had ${extraCount} unexpected entries.\n${extraString}`);
    }
  }

  return errors;
};

const getMissing = (keysA: string[], keysB: string[]): string[] => {
  const missing: string[] = [];

  keysA.forEach(key => {
    if (!keysB.includes(key)) {
      missing.push(key);
    }
  });

  return missing;
};

const validateRule = (
  baseJson: LangJson,
  lang: string,
  langJson: LangJson,
  type: PatternType,
  regex: RegExp,
  options: Options,
): string[] => {
  const errors: string[] = [];
  const flipMarkup = type === 'markup tags';

  Object.entries(langJson).forEach(([key, value]) => {
    if (options.validation.mismatchedPlaceholders.includes(key) && type === 'placeholders') {
      return;
    }

    const baseValue = baseJson[key] ?? '';
    let baseMatches: string[] = baseValue.match(regex) || [];
    let localMatches: string[] = value.match(regex) || [];

    if (flipMarkup) {
      baseMatches = baseMatches.map(flipIfNeeded);
      localMatches = localMatches.map(flipIfNeeded);
    }

    if (baseValue.length === 0) {
      return; // Not present. Will turn up in validateKeys.
    }

    if (baseMatches.length === 0 && localMatches.length === 0) {
      return;
    }

    const baseString = JSON.stringify(baseMatches.sort());
    const localString = JSON.stringify(localMatches.sort());

    if (baseString !== localString) {
      const basePreview = baseMatches.length > 0 ? baseMatches.join(',') : '<none>';
      const localPreview = localMatches.length > 0 ? localMatches.join(',') : '<none>';

      errors.push(
        `${lang}: "${key}" has mismatched ${type}.\n - ${basePreview} vs ${localPreview}`,
      );
    }
  });

  return errors;
};

const flipIfNeeded = (tag: string): string => {
  const match = tag.match(/<([0-9]+)\/>/m);

  if (match !== null && match.length === 2) {
    return `</${match[1]}>`;
  }

  return tag;
};
