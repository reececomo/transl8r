"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortJsonFile = exports.saveJsonFile = exports.loadJsonFiles = exports.loadJsonFile = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-unsafe-call */
const fs_1 = require("fs");
const sort_json_1 = tslib_1.__importDefault(require("sort-json"));
const logger_1 = require("./logger");
const getFilePath = (path, langCode, namespace) => path.replace(/{{lang}}/gi, langCode).replace(/{{namespace}}/, namespace);
const loadJsonFile = (path, langCode, namespace) => {
    const file = getFilePath(path, langCode, namespace);
    try {
        const data = fs_1.readFileSync(file, 'utf8');
        return JSON.parse(data);
    }
    catch (err) {
        return {};
    }
};
exports.loadJsonFile = loadJsonFile;
const loadJsonFiles = (path, language, namespaces) => namespaces.reduce((combined, namespace) => {
    try {
        const json = exports.loadJsonFile(path, language, namespace);
        return Object.assign(Object.assign({}, combined), json);
    }
    catch (err) {
        logger_1.logMessage(language, `Skipping load for namespace: ${namespace} (${err})`);
        return combined;
    }
}, {});
exports.loadJsonFiles = loadJsonFiles;
const saveJsonFile = (path, langCode, namespace, json) => {
    const file = getFilePath(path, langCode, namespace);
    fs_1.writeFileSync(file, JSON.stringify(sort_json_1.default(json), null, 2) + '\n');
};
exports.saveJsonFile = saveJsonFile;
const sortJsonFile = (path, langCode, namespace) => {
    const file = getFilePath(path, langCode, namespace);
    try {
        sort_json_1.default.overwrite(file);
    }
    catch (err) {
        // Probably file does not exist.
    }
};
exports.sortJsonFile = sortJsonFile;
//# sourceMappingURL=file.js.map