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
}

export interface Options {
  baseLang: string;
  langs: string[];
  namespace: string;
  availableNamespaces: string[];
  path: string;
  validation: {
    mismatchedPlaceholders: string[];
  };
}

export interface CommandOptions {
  baseLang?: string;
  langs?: string[];
  namespace?: string;
  availableNamespaces?: string[];
  path?: string;
  configFile: string;
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
}
