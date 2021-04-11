"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
const tslib_1 = require("tslib");
const command_line_usage_1 = tslib_1.__importDefault(require("command-line-usage"));
const logger_1 = require("../helpers/logger");
const options_1 = require("../options");
const help = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const help = command_line_usage_1.default([
        {
            header: 'transl8r',
            content: 'Manage translation files for a project.',
        },
        {
            header: 'Modes',
            optionList: options_1.commandModes,
        },
        {
            header: 'Options',
            optionList: options_1.commandOptions,
        },
    ]);
    logger_1.log(help);
};
exports.help = help;
//# sourceMappingURL=help.js.map