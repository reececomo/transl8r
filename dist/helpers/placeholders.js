"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePlaceholders = exports.preparePlaceholders = void 0;
// Wraps attributes/placeholders in "notranslate" blocks.
const preparePlaceholders = (input) => input
    // Laravel style
    .replace(/(:[a-zA-Z0-9-_]+)/gi, '<span class="notranslate">$1</span>')
    // React style
    .replace(/<([0-9]+)>([^<]+)<\/[0-9]+>/gi, '__$1__$2__/$1__')
    .replace(/(__\/?[0-9]+__)/gi, '<span class="notranslate">$1</span>')
    .replace(/(\{\{[a-zA-Z0-9-_.]+\}\})/gi, '<span class="notranslate">$1</span>');
exports.preparePlaceholders = preparePlaceholders;
// Unwraps "notranslate" blocks back to attributes/placeholders.
const resolvePlaceholders = (input) => {
    const result = input
        .replace(/\/span> <span/gi, '/span><span')
        .replace(/<span class="notranslate">([a-zA-Z0-9-_.:{}</>]+)<\/span>/gi, '$1')
        .replace(/__([0-9]+)__([^_]+)__\/([0-9]+)__/gi, '<$1>$2</$3>');
    return result;
};
exports.resolvePlaceholders = resolvePlaceholders;
//# sourceMappingURL=placeholders.js.map