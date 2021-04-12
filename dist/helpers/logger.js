"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWarn = exports.log = exports.logMessage = void 0;
/* eslint-disable no-console */
const logMessage = (langCode, message) => {
    console.log((langCode + ': ').padEnd(8) + message);
};
exports.logMessage = logMessage;
const log = (message) => {
    console.log(message);
};
exports.log = log;
const logWarn = (message) => {
    console.warn(`${message}\n`);
};
exports.logWarn = logWarn;
//# sourceMappingURL=logger.js.map