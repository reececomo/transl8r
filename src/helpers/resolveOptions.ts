/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from 'fs';
import YAML from 'yaml';
import { config } from '../config';
import { Options, CommandOptions, YamlOptions } from '../types';

/**
 * Accepts command line options and YAML options, and then returns result.
 */
export const resolveCommandOptions = (cmd: CommandOptions): Options => {
  const fileContents = fs.readFileSync(cmd.configFile, 'utf8');
  const yml: YamlOptions = YAML.parse(fileContents);

  const baseLang = cmd.baseLang ?? yml.languages?.base ?? config.languages.base;
  const langs = cmd.langs ?? yml.languages?.other ?? config.languages.other;
  const namespace = cmd.namespace ?? yml.namespaces?.target ?? config.namespaces.target;
  const path = cmd.path ?? yml.path ?? config.path;

  const availableNamespaces =
    cmd.availableNamespaces ?? yml.namespaces?.other ?? config.namespaces.other;

  if (!availableNamespaces.includes(namespace)) {
    availableNamespaces.push(namespace);
  }

  const validation = {
    mismatchedPlaceholders: yml.validation?.mismatchedPlaceholders ?? [],
  };

  return { baseLang, langs, namespace, availableNamespaces, path, validation };
};
