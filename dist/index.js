#!/usr/bin/env node
"use strict";
/* eslint-disable @typescript-eslint/consistent-type-assertions */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_line_args_1 = tslib_1.__importDefault(require("command-line-args"));
const add_1 = require("./commands/add");
const alt_1 = require("./commands/alt");
const backfill_1 = require("./commands/backfill");
const clean_1 = require("./commands/clean");
const help_1 = require("./commands/help");
const lint_1 = require("./commands/lint");
const remove_1 = require("./commands/remove");
const sort_1 = require("./commands/sort");
const exportTodo_1 = require("./commands/exportTodo");
const importCsv_1 = require("./commands/importCsv");
const resolveOptions_1 = require("./helpers/resolveOptions");
const options_1 = require("./options");
const args = command_line_args_1.default([...options_1.commandModes, ...options_1.commandOptions]);
const mode = args;
const cmdOptions = args;
const options = resolveOptions_1.resolveCommandOptions(cmdOptions);
if (mode.add) {
    add_1.add(mode.add, options);
}
else if (mode.alt) {
    alt_1.alt(mode.alt, options);
}
else if (mode.remove) {
    remove_1.remove(mode.remove, options);
}
else if (mode.clean) {
    clean_1.clean(options);
}
else if (mode.backfill) {
    backfill_1.backfill(options);
}
else if (mode.sort) {
    sort_1.sort(options);
}
else if (mode.lint) {
    lint_1.lint(options);
}
else if (mode.exportTodo) {
    exportTodo_1.exportTodo(options);
}
else if (mode.importCsv) {
    importCsv_1.importCsv(mode.importCsv, options);
}
else {
    help_1.help();
}
//# sourceMappingURL=index.js.map