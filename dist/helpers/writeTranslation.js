"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTranslation = void 0;
const fetch_1 = require("./fetch");
const file_1 = require("./file");
const logger_1 = require("./logger");
const writeTranslation = (key, newValue, lang, options) => {
    fetch_1.fetchTranslation(newValue, options.baseLang, lang).then(translated => {
        // For fun we're going to sanity-check the translations
        // by returning them to the base language for comparison
        fetch_1.fetchTranslation(translated, lang, options.baseLang).then(sanityCheck => {
            const existingJson = file_1.loadJsonFile(options.path, lang, options.namespace);
            const combinedJson = Object.assign(existingJson, { [key]: translated });
            file_1.saveJsonFile(options.path, lang, options.namespace, combinedJson);
            if (options.baseLang !== lang) {
                logger_1.logMessage(lang, translated + '\n' + '→ '.padStart(10) + sanityCheck + '\n');
            }
        });
    });
};
exports.writeTranslation = writeTranslation;
//# sourceMappingURL=writeTranslation.js.map