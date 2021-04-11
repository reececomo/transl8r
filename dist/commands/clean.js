"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeExistingStringsFromDestinationStrings = exports.clean = void 0;
const file_1 = require("../helpers/file");
const logger_1 = require("../helpers/logger");
const clean = (options) => {
    options.langs.forEach(lang => exports.removeExistingStringsFromDestinationStrings(lang, options));
};
exports.clean = clean;
const removeExistingStringsFromDestinationStrings = (lang, options) => {
    const namespaces = searchNamespacesExcludingDestination(options.availableNamespaces, options.namespace);
    const existingKeys = Object.keys(file_1.loadJsonFiles(options.path, lang, namespaces));
    const existingDestinationJson = file_1.loadJsonFile(options.path, lang, options.namespace);
    const beforeCount = Object.keys(existingDestinationJson).length;
    const newJson = existingDestinationJson;
    existingKeys.forEach(k => delete newJson[k]);
    const removedCount = beforeCount - Object.keys(newJson).length;
    if (removedCount === 0) {
        logger_1.logMessage(lang, 'Up to date ✓');
        return;
    }
    logger_1.logMessage(lang, `Purged ${removedCount} unreachable key(s).`);
    file_1.saveJsonFile(options.path, lang, options.namespace, newJson);
};
exports.removeExistingStringsFromDestinationStrings = removeExistingStringsFromDestinationStrings;
const searchNamespacesExcludingDestination = (searchNamespaces, destinationNamespace) => {
    const index = searchNamespaces.indexOf(destinationNamespace);
    if (index !== -1) {
        searchNamespaces.splice(index, 1);
    }
    return searchNamespaces;
};
//# sourceMappingURL=clean.js.map