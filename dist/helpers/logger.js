"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.logMessage = void 0;
/* eslint-disable no-console */
const logMessage = (langCode, message) => {
    console.log((langCode + ': ').padEnd(8) + message);
};
exports.logMessage = logMessage;
const log = (message) => {
    console.log(message);
};
exports.log = log;
//# sourceMappingURL=logger.js.map