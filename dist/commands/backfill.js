"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backfill = void 0;
const fetch_1 = require("../helpers/fetch");
const file_1 = require("../helpers/file");
const logger_1 = require("../helpers/logger");
const backfill = (options) => {
    options.langs.forEach(lang => backfillTranslations(lang, options));
};
exports.backfill = backfill;
const backfillTranslations = (lang, options) => {
    const baseLangJson = file_1.loadJsonFiles(options.path, options.baseLang, options.availableNamespaces);
    const baseLangKeys = Object.keys(baseLangJson);
    const existingLangKeys = Object.keys(file_1.loadJsonFiles(options.path, lang, options.availableNamespaces));
    const existingLangDestinationJson = file_1.loadJsonFile(options.path, lang, options.namespace);
    const missingKeys = baseLangKeys.filter(key => !existingLangKeys.includes(key));
    if (missingKeys.length === 0) {
        logger_1.logMessage(lang, 'Up to date ✓');
        return;
    }
    logger_1.logMessage(lang, `Fetching ${missingKeys.length} missing key(s).`);
    fetch_1.fetchTranslations(baseLangJson, missingKeys, options.baseLang, lang).then(newTranslations => {
        const newCount = Object.keys(newTranslations).length;
        const combinedJson = Object.assign(newTranslations, existingLangDestinationJson);
        logger_1.logMessage(lang, `${newCount} key(s) added.`);
        file_1.saveJsonFile(options.path, lang, options.namespace, combinedJson);
    });
};
//# sourceMappingURL=backfill.js.map