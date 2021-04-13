"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCsv = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const csv_parser_1 = tslib_1.__importDefault(require("csv-parser"));
const prompt_1 = tslib_1.__importDefault(require("prompt"));
const file_1 = require("../helpers/file");
const logger_1 = require("../helpers/logger");
const importCsv = (file, options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield readCsv(file).then((csvData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const count = Object.keys(csvData.data).length;
        if (count === 0) {
            logger_1.logMessage(csvData.lang, 'No strings to import.');
            return;
        }
        yield prompt_1.default.get(['namespace'], (_, input) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const namespace = input.namespace.length > 0 ? input.namespace : options.namespace;
            const existingJson = file_1.loadJsonFile(options.path, csvData.lang, namespace);
            file_1.saveJsonFile(options.path, csvData.lang, namespace, Object.assign(Object.assign({}, existingJson), csvData.data));
            const filePath = file_1.getFilePath(options.path, csvData.lang, namespace);
            logger_1.logMessage(csvData.lang, `Imported ${count} strings to: ${filePath}`);
        }));
    }));
});
exports.importCsv = importCsv;
const readCsv = (file) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let lang;
        const data = {};
        fs_1.default.createReadStream(file)
            .pipe(csv_parser_1.default())
            .on('headers', (headers) => {
            var _a, _b;
            lang = ((_b = (_a = headers[2]) !== null && _a !== void 0 ? _a : headers[1]) !== null && _b !== void 0 ? _b : '').trim();
            logger_1.log(`Language detected as: ${lang}`);
        })
            .on('data', (row) => {
            var _a, _b;
            const key = ((_a = row['contextKey']) !== null && _a !== void 0 ? _a : '').trim();
            const value = ((_b = row[lang]) !== null && _b !== void 0 ? _b : '').trim();
            if (key.length === 0) {
                reject('Invalid row - contextKey was blank.');
            }
            else if (key.match(/^[a-zA-Z0-9.-_]+$/) === null) {
                reject(`Invalid row - contextKey contained invalid characters: ${key}.`);
            }
            else if (value.length === 0) {
                logger_1.log('Skipping row - value was blank.');
                return;
            }
            data[key] = value;
        })
            .on('end', () => resolve({ lang, data }));
    });
});
//# sourceMappingURL=importCsv.js.map