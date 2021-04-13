export type LangJson = { [k: string]: string };

export interface CommandModes {
  add: string;
  alt: string;
  remove: string;
  clean: boolean;
  backfill: boolean;
  sort: boolean;
  help: boolean;
  lint: boolean;
  exportTodo: boolean;
  importCsv: string;
}

export interface Options {
  group: string;
  baseLang: string;
  langs: string[];
  namespace: string;
  availableNamespaces: string[];
  path: string;
  validation: {
    mismatchedPlaceholders: string[];
  };
  export: {
    outputDir: string;
    omitGenerated: boolean;
  };
}

export interface CommandOptions {
  baseLang?: string;
  langs?: string[];
  namespace?: string;
  availableNamespaces?: string[];
  path?: string;
  configFile: string;
  outputDir?: string;
  group?: string;
  omitGenerated?: boolean;
}

export interface YamlOptions {
  group?: string;
  languages?: {
    base?: string;
    other?: string[];
  };
  namespaces?: {
    target?: string;
    other?: string[];
  };
  path?: string;
  validation?: {
    mismatchedPlaceholders?: string[];
  };
  export?: {
    outputDir?: string;
    omitGenerated?: boolean;
  };
}
