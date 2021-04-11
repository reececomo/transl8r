"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTranslations = exports.fetchTranslation = void 0;
const tslib_1 = require("tslib");
const v2_1 = require("@google-cloud/translate/build/src/v2");
const config_1 = require("../config");
const placeholders_1 = require("./placeholders");
const translate = (text, options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const client = new v2_1.Translate({
        keyFilename: config_1.config.googleTranslateKeyFile,
    });
    const [translation] = yield client.translate(text, options);
    return translation;
});
const fetchTranslation = (original, baseLang, newLang) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (baseLang === newLang) {
        return original;
    }
    const before = placeholders_1.preparePlaceholders(original);
    const translation = yield translate(before, {
        from: baseLang,
        to: newLang,
    });
    return placeholders_1.resolvePlaceholders(translation);
});
exports.fetchTranslation = fetchTranslation;
// Translate some subset of keys from the base JSON into the new language.
const fetchTranslations = (baseJson, keysToTranslate, baseLang, newLang) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return new Promise((resolve, reject) => {
        Promise.all(keysToTranslate.map((key) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            var _a;
            return ({
                [key]: yield exports.fetchTranslation((_a = baseJson[key]) !== null && _a !== void 0 ? _a : '', baseLang, newLang),
            });
        })))
            .then(data => resolve(Object.assign({}, ...data)))
            .catch(error => reject(error));
    });
});
exports.fetchTranslations = fetchTranslations;
//# sourceMappingURL=fetch.js.map