"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
const tslib_1 = require("tslib");
const prompt_1 = tslib_1.__importDefault(require("prompt"));
const writeTranslation_1 = require("../helpers/writeTranslation");
const add = (key, options) => {
    prompt_1.default.get(['value'], (_, input) => {
        options.langs.forEach(lang => writeTranslation_1.writeTranslation(key, input.value, lang, options));
        writeTranslation_1.writeTranslation(key, input.value, options.baseLang, options);
    });
};
exports.add = add;
//# sourceMappingURL=add.js.map