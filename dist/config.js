"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    /**
     * Google Application Credentials
     * @see https://cloud.google.com/docs/authentication/getting-started
     */
    googleTranslateKeyFile: (_a = process.env.GOOGLE_APPLICATION_CREDENTIALS) !== null && _a !== void 0 ? _a : undefined,
    languages: {
        base: 'en',
        other: ['fr'],
    },
    namespaces: {
        target: 'base.generated',
        other: ['base'],
    },
    path: './{{lang}}/{{namespace}}.json',
};
//# sourceMappingURL=config.js.map