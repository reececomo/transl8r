"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
const file_1 = require("../helpers/file");
const sort = (options) => {
    options.langs.forEach(lang => {
        options.availableNamespaces.forEach(ns => file_1.sortJsonFile(options.path, lang, ns));
    });
};
exports.sort = sort;
//# sourceMappingURL=sort.js.map