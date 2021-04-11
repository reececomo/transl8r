"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveCommandOptions = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-unsafe-call */
const fs_1 = tslib_1.__importDefault(require("fs"));
const yaml_1 = tslib_1.__importDefault(require("yaml"));
const config_1 = require("../config");
/**
 * Accepts command line options and YAML options, and then returns result.
 */
const resolveCommandOptions = (cmd) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const fileContents = fs_1.default.readFileSync(cmd.configFile, 'utf8');
    const yml = yaml_1.default.parse(fileContents);
    const baseLang = (_c = (_a = cmd.baseLang) !== null && _a !== void 0 ? _a : (_b = yml.languages) === null || _b === void 0 ? void 0 : _b.base) !== null && _c !== void 0 ? _c : config_1.config.languages.base;
    const langs = (_f = (_d = cmd.langs) !== null && _d !== void 0 ? _d : (_e = yml.languages) === null || _e === void 0 ? void 0 : _e.other) !== null && _f !== void 0 ? _f : config_1.config.languages.other;
    const namespace = (_j = (_g = cmd.namespace) !== null && _g !== void 0 ? _g : (_h = yml.namespaces) === null || _h === void 0 ? void 0 : _h.target) !== null && _j !== void 0 ? _j : config_1.config.namespaces.target;
    const path = (_l = (_k = cmd.path) !== null && _k !== void 0 ? _k : yml.path) !== null && _l !== void 0 ? _l : config_1.config.path;
    const availableNamespaces = (_p = (_m = cmd.availableNamespaces) !== null && _m !== void 0 ? _m : (_o = yml.namespaces) === null || _o === void 0 ? void 0 : _o.other) !== null && _p !== void 0 ? _p : config_1.config.namespaces.other;
    if (!availableNamespaces.includes(namespace)) {
        availableNamespaces.push(namespace);
    }
    const validation = {
        mismatchedPlaceholders: (_r = (_q = yml.validation) === null || _q === void 0 ? void 0 : _q.mismatchedPlaceholders) !== null && _r !== void 0 ? _r : [],
    };
    return { baseLang, langs, namespace, availableNamespaces, path, validation };
};
exports.resolveCommandOptions = resolveCommandOptions;
//# sourceMappingURL=resolveOptions.js.map