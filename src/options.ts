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
    name: 'exportTodo',
    description: 'Generate a ZIP containing CSVs of strings ready to translate.',
    type: Boolean,
  },
  {
    name: 'importCsv',
    description:
      'Import a CSV file of strings into the language files. MUST contain headers.\n' +
      'Must be in one of these supported formats:\n' +
      '- "contextKey,\\{\\{lang\\}\\}" - e.g. "contextKey,fr" imports French.\n' +
      '- "contextKey,\\{\\{from\\}\\},\\{\\{to\\}\\}" - e.g. "contextKey,en,it" imports Italian.',
    type: String,
  },
  {
    name: 'help',
    description: 'See this helpful message.',
    type: Boolean,
  },
];

export const commandOptions: OptionDefinition[] = [
  {
    name: 'configFile',
    alias: 'c',
    description: 'Config file path (default: ".transl8r.yml")',
    type: String,
    defaultValue: '.transl8r.yml',
  },
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
      'Hint: use `\\{\\{lang\\}\\}` and `\\{\\{namespace\\}\\}` as placeholders.',
    type: String,
  },
  {
    name: 'outputDir',
    alias: 'o',
    description:
      'Directory for output artefacts, for commands that support them.\n' +
      'Hint: use `\\{\\{group\\}\\}` and `\\{\\{date\\}\\}` as placeholders.',
    type: String,
  },
  {
    name: 'group',
    alias: 'g',
    description: 'Identifying group for commands that rely on it.',
    type: String,
  },
  {
    name: 'omitGenerated',
    description: 'When exporting strings, do not include generated values.',
    type: Boolean,
  },
];
