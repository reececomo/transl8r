import commandLineUsage from 'command-line-usage';
import { log } from '../helpers/logger';
import { commandModes, commandOptions } from '../options';

export const help = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const help = commandLineUsage([
    {
      header: 'transl8r',
      content: 'Manage translation files for a project.',
    },
    {
      header: 'Modes',
      optionList: commandModes,
    },
    {
      header: 'Options',
      optionList: commandOptions,
    },
  ]);

  log(help);
};
