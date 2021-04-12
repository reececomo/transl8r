"use strict";
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWarn = exports.logError = exports.logMessage = exports.log = void 0;
const log = (message) => {
    console.log(message);
};
exports.log = log;
const logMessage = (langCode, message) => {
    console.log((langCode + ': ').padEnd(8) + message);
};
exports.logMessage = logMessage;
const logError = (langCode, message) => {
    console.error((langCode + ': ').padEnd(8) + message);
};
exports.logError = logError;
const logWarn = (message) => {
    console.warn(`${message}\n`);
};
exports.logWarn = logWarn;
//# sourceMappingURL=logger.js.map