"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todo = void 0;
const tslib_1 = require("tslib");
const csv_writer_1 = require("csv-writer");
const file_1 = require("../helpers/file");
const logger_1 = require("../helpers/logger");
const fs_1 = tslib_1.__importDefault(require("fs"));
const zip_1 = require("../helpers/zip");
const removeDir_1 = require("../helpers/removeDir");
const todo = (options) => {
    const baseJson = file_1.loadJsonFiles(options.path, options.baseLang, options.availableNamespaces);
    const namespaces = getNonGeneratedNamespaces(options);
    const outputDir = options.outputDir;
    const outputZip = `${options.outputDir}.zip`;
    options.langs.forEach(lang => {
        const langJson = file_1.loadJsonFiles(options.path, lang, namespaces);
        const missingJson = getMissing(baseJson, langJson);
        const missingCount = Object.keys(missingJson).length;
        if (missingCount === 0) {
            logger_1.logMessage(lang, 'No keys awaiting translation.');
            return;
        }
        const filePath = `${outputDir}/${options.group}.${lang}.csv`;
        fs_1.default.mkdirSync(outputDir, { recursive: true });
        const csvWriter = csv_writer_1.createObjectCsvWriter({
            path: filePath,
            header: ['contextKey', options.baseLang, lang],
        });
        const records = Object.entries(missingJson).map(([key, value]) => ({
            contextKey: key,
            [options.baseLang]: value,
            [lang]: '',
        }));
        csvWriter.writeRecords(records).then(() => {
            logger_1.logMessage(lang, `...extracted ${missingCount} keys: ${filePath}`);
        });
    });
    zip_1.zip(outputDir, outputZip).then(() => {
        logger_1.log(`Saved ${outputZip}`);
        removeDir_1.removeDir(outputDir);
    });
};
exports.todo = todo;
// Assumes "target" namespace is the generated namespace.
const getNonGeneratedNamespaces = (options) => {
    const nonGeneratedNamespaces = options.availableNamespaces;
    const nsIndex = nonGeneratedNamespaces.indexOf(options.namespace);
    if (nsIndex > -1) {
        nonGeneratedNamespaces.splice(nsIndex, 1);
    }
    return nonGeneratedNamespaces;
};
const getMissing = (jsonA, jsonB) => {
    const missing = {};
    const keysA = Object.keys(jsonA);
    const keysB = Object.keys(jsonB);
    keysA.forEach(key => {
        var _a;
        if (!keysB.includes(key)) {
            missing[key] = (_a = jsonA[key]) !== null && _a !== void 0 ? _a : '';
        }
    });
    return missing;
};
//# sourceMappingURL=todo.js.map