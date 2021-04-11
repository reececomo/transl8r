import { OptionDefinition } from 'command-line-usage';

export const commandModes: OptionDefinition[] = [
  {
    name: 'add',
    alias: 'a',
    description: 'Add a translation key for all languages (including base language).',
    type: String,
  },
  {
    name: 'alt',
    description: 'Use an alternative translation for non-base languages.',
    type: String,
  },
  {
    name: 'remove',
    alias: 'r',
    description: 'Remove a specific key from all translation files.',
    type: String,
  },
  {
    name: 'clean',
    description: 'Remove all existing translated strings from generated destination files.',
    type: Boolean,
  },
  {
    name: 'backfill',
    description: 'Backfill all missing translations.',
    type: Boolean,
  },
  {
    name: 'sort',
    description: 'Tidy and sort all of the translation files by key.',
    type: Boolean,
  },
  {
    name: 'lint',
    description: 'Validate the translation files.',
    type: Boolean,
  },
  {
    name: 'help',
    description: 'See this helpful message.',
    type: Boolean,
  },
];

export const commandOptions: OptionDefinition[] = [
  {
    name: 'baseLang',
    alias: 'b',
    description: 'The base langauge to translate from.',
    type: String,
  },
  {
    name: 'langs',
    alias: 'l',
    description: 'One or more languages to translate to.',
    type: String,
    multiple: true,
  },
  {
    name: 'namespace',
    alias: 'n',
    description: 'The target namespace for generated files etc.',
    type: String,
  },
  {
    name: 'availableNamespaces',
    description: 'The available namespaces to look for files matching.',
    type: String,
    multiple: true,
  },
  {
    name: 'path',
    alias: 'p',
    description:
      'A filepath expression to look for translation files.\n' +
      '(e.g. "./resources/locales/\\{\\{lang\\}\\}/\\{\\{namespace\\}\\}.json")\n' +
      'Hint: use `\\{\\{lang\\}\\}` and `\\{\\{namespace\\}\\}` for path placeholders.',
    type: String,
  },
  {
    name: 'configFile',
    alias: 'c',
    description: 'Config file path (default: ".transl8r.yml")',
    type: String,
    defaultValue: '.transl8r.yml',
  },
];
