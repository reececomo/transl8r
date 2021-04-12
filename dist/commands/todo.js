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
const sleep_1 = require("../helpers/sleep");
const todo = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const baseJson = file_1.loadJsonFiles(options.path, options.baseLang, options.availableNamespaces);
    const namespaces = getNonGeneratedNamespaces(options);
    const outputDir = options.outputDir;
    const outputZip = `${options.outputDir}.zip`;
    let filesAdded = 0;
    let filesUnresolved = 0;
    options.langs.forEach((lang) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        filesUnresolved += 1;
        const langJson = file_1.loadJsonFiles(options.path, lang, namespaces);
        const langGeneratedJson = file_1.loadJsonFiles(options.path, lang, [options.namespace]);
        const missingJson = getMissing(baseJson, langJson);
        const missingCount = Object.keys(missingJson).length;
        if (missingCount === 0) {
            return;
        }
        const fileName = `${options.group}.${lang}.csv`;
        const filePath = `${outputDir}/${fileName}`;
        const csvHeader = {
            contextKey: 'contextKey',
            [options.baseLang]: options.baseLang,
            [lang]: lang,
        };
        fs_1.default.mkdirSync(outputDir, { recursive: true });
        const csvWriter = csv_writer_1.createObjectCsvWriter({
            path: filePath,
            header: ['contextKey', options.baseLang, lang],
        });
        const records = Object.entries(missingJson).map(([key, value]) => {
            var _a;
            return ({
                contextKey: key,
                [options.baseLang]: value,
                [lang]: (_a = langGeneratedJson[key]) !== null && _a !== void 0 ? _a : '',
            });
        });
        yield csvWriter
            .writeRecords([csvHeader, ...records])
            .then(() => {
            filesAdded += 1;
            logger_1.logMessage(lang, `Extracted ${missingCount} keys (${fileName})`);
        })
            .catch(error => logger_1.logError(lang, `Failed to generated CSV. ${error}`))
            .finally(() => {
            filesUnresolved -= 1;
        });
    }));
    while (filesUnresolved > 0)
        yield sleep_1.sleep(100);
    if (filesAdded === 0) {
        logger_1.log('Everything up to date ✓');
    }
    else {
        zip_1.zip(outputDir, outputZip).then(() => {
            logger_1.log(`Saved ${outputZip}`);
            removeDir_1.removeDir(outputDir);
        });
    }
});
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