"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeKey = exports.remove = void 0;
const file_1 = require("../helpers/file");
const logger_1 = require("../helpers/logger");
const remove = (key, options) => {
    options.langs.forEach(lang => exports.removeKey(key, lang, options));
    exports.removeKey(key, options.baseLang, options);
};
exports.remove = remove;
const removeKey = (key, lang, options) => {
    const existingJson = file_1.loadJsonFile(options.path, lang, options.namespace);
    if (existingJson[key]) {
        delete existingJson[key];
        file_1.saveJsonFile(options.path, lang, options.namespace, existingJson);
        logger_1.logMessage(lang, 'Purged key ✓');
    }
    else {
        logger_1.logMessage(lang, 'Key not found.');
    }
};
exports.removeKey = removeKey;
//# sourceMappingURL=remove.js.map