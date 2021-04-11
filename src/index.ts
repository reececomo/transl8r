#!/usr/bin/env node
/* eslint-disable @typescript-eslint/consistent-type-assertions */

import commandLineArgs from 'command-line-args';
import { add } from './commands/add';
import { alt } from './commands/alt';
import { backfill } from './commands/backfill';
import { clean } from './commands/clean';
import { help } from './commands/help';
import { lint } from './commands/lint';
import { remove } from './commands/remove';
import { sort } from './commands/sort';
import { resolveCommandOptions } from './helpers/resolveOptions';
import { commandModes, commandOptions } from './options';
import { CommandModes, CommandOptions } from './types';

const args = commandLineArgs([...commandModes, ...commandOptions]);
const mode = args as CommandModes;
const cmdOptions = args as CommandOptions;
const options = resolveCommandOptions(cmdOptions);

if (mode.add) {
  add(mode.add, options);
} else if (mode.alt) {
  alt(mode.alt, options);
} else if (mode.remove) {
  remove(mode.remove, options);
} else if (mode.clean) {
  clean(options);
} else if (mode.backfill) {
  backfill(options);
} else if (mode.sort) {
  sort(options);
} else if (mode.lint) {
  lint(options);
} else {
  help();
}
