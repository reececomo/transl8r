/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from 'fs';
import YAML from 'yaml';
import { config } from '../config';
import { Options, CommandOptions, YamlOptions } from '../types';
import path from 'path';
import { logWarn } from './logger';
import dateFormat from 'dateformat';

/**
 * Accepts command line options and YAML options, and then returns result.
 */
export const resolveCommandOptions = (cmd: CommandOptions): Options => {
  const yml: YamlOptions = getYamlOptions(cmd.configFile);

  const namespace = cmd.namespace ?? yml.namespaces?.target ?? config.namespaces.target;

  const availableNamespaces =
    cmd.availableNamespaces ?? yml.namespaces?.other ?? config.namespaces.other;

  const group = cmd.group ?? yml.group ?? path.basename(path.resolve());

  if (!availableNamespaces.includes(namespace)) {
    availableNamespaces.push(namespace);
  }

  return {
    group: group,
    baseLang: cmd.baseLang ?? yml.languages?.base ?? config.languages.base,
    langs: cmd.langs ?? yml.languages?.other ?? config.languages.other,
    namespace,
    availableNamespaces,
    path: cmd.path ?? yml.path ?? config.path,
    validation: {
      mismatchedPlaceholders: yml.validation?.mismatchedPlaceholders ?? [],
    },
    export: {
      omitGenerated: cmd.omitGenerated ?? yml.export?.omitGenerated ?? config.export.omitGenerated,
      outputDir: (cmd.outputDir ?? yml.export?.outputDir ?? config.export.outputDir)
        .replace(/{{group}}/, group)
        .replace(/{{date}}/, dateFormat(Date(), 'yyyy-mm-dd')),
    },
  };
};

const getYamlOptions = (configFile: string): YamlOptions => {
  try {
    const fileContents = fs.readFileSync(configFile, 'utf8');
    const yml: YamlOptions = YAML.parse(fileContents);

    return yml;
  } catch (err) {
    logWarn(`(No YAML config file detected: "${configFile}" -- ${err})`);
    return {};
  }
};
