"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alt = void 0;
const tslib_1 = require("tslib");
const prompt_1 = tslib_1.__importDefault(require("prompt"));
const writeTranslation_1 = require("../helpers/writeTranslation");
const alt = (key, options) => {
    prompt_1.default.get(['translateAs'], (_, input) => {
        options.langs.forEach(lang => writeTranslation_1.writeTranslation(key, input.translateAs, lang, options));
    });
};
exports.alt = alt;
//# sourceMappingURL=alt.js.map