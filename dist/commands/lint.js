"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lint = void 0;
const file_1 = require("../helpers/file");
const logger_1 = require("../helpers/logger");
const MARKUP_REGEX = /<(\/?[0-9]+\/?)>/g;
const LARAVEL_VAR_REGEX = /(:[a-zA-Z0-9_]+)/g;
const I18NEXT_VAR_REGEX = /({{[a-zA-Z0-9_]+}})/g;
const lint = (options) => {
    const baseJson = file_1.loadJsonFiles(options.path, options.baseLang, options.availableNamespaces);
    const baseKeys = Object.keys(baseJson);
    let errors = [];
    options.langs.forEach(lang => {
        const langJson = file_1.loadJsonFiles(options.path, lang, options.availableNamespaces);
        const langKeys = Object.keys(langJson);
        errors = [
            ...errors,
            ...validateKeys(baseKeys, lang, langKeys),
            ...validateRule(baseJson, lang, langJson, 'markup tags', MARKUP_REGEX, options),
            ...validateRule(baseJson, lang, langJson, 'placeholders', I18NEXT_VAR_REGEX, options),
            ...validateRule(baseJson, lang, langJson, 'placeholders', LARAVEL_VAR_REGEX, options),
        ];
    });
    if (errors.length > 0) {
        const failMessage = `Failed to validate, there were ${errors.length} errors`;
        logger_1.log(`${failMessage}:`);
        errors.forEach(error => logger_1.log(error));
        throw failMessage;
    }
    logger_1.log('Validated.');
};
exports.lint = lint;
const validateKeys = (baseKeys, lang, langKeys) => {
    const errors = [];
    if (JSON.stringify(baseKeys) !== JSON.stringify(langKeys)) {
        const missingKeys = getMissing(baseKeys, langKeys);
        const missingCount = missingKeys.length;
        const missingString = missingKeys.map(k => ` - missing: "${k}"`).join('\n');
        const extraKeys = getMissing(langKeys, baseKeys);
        const extraString = extraKeys.map(k => ` - extra: "${k}"`).join('\n');
        const extraCount = extraKeys.length;
        if (missingCount > 0) {
            errors.push(`${lang}: Missing ${missingCount} expected entries.\n${missingString}`);
        }
        if (extraCount > 0) {
            errors.push(`${lang}: Had ${extraCount} unexpected entries.\n${extraString}`);
        }
    }
    return errors;
};
const getMissing = (keysA, keysB) => {
    const missing = [];
    keysA.forEach(key => {
        if (!keysB.includes(key)) {
            missing.push(key);
        }
    });
    return missing;
};
const validateRule = (baseJson, lang, langJson, type, regex, options) => {
    const errors = [];
    const flipMarkup = type === 'markup tags';
    Object.entries(langJson).forEach(([key, value]) => {
        var _a;
        if (options.validation.mismatchedPlaceholders.includes(key) && type === 'placeholders') {
            return;
        }
        const baseValue = (_a = baseJson[key]) !== null && _a !== void 0 ? _a : '';
        let baseMatches = baseValue.match(regex) || [];
        let localMatches = value.match(regex) || [];
        if (flipMarkup) {
            baseMatches = baseMatches.map(flipIfNeeded);
            localMatches = localMatches.map(flipIfNeeded);
        }
        if (baseValue.length === 0) {
            return; // Not present. Will turn up in validateKeys.
        }
        if (baseMatches.length === 0 && localMatches.length === 0) {
            return;
        }
        const baseString = JSON.stringify(baseMatches.sort());
        const localString = JSON.stringify(localMatches.sort());
        if (baseString !== localString) {
            const basePreview = baseMatches.length > 0 ? baseMatches.join(',') : '<none>';
            const localPreview = localMatches.length > 0 ? localMatches.join(',') : '<none>';
            errors.push(`${lang}: "${key}" has mismatched ${type}.\n - ${basePreview} vs ${localPreview}`);
        }
    });
    return errors;
};
const flipIfNeeded = (tag) => {
    const match = tag.match(/<([0-9]+)\/>/m);
    if (match !== null && match.length === 2) {
        return `</${match[1]}>`;
    }
    return tag;
};
//# sourceMappingURL=lint.js.map