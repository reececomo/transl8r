"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveCommandOptions = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-unsafe-call */
const fs_1 = tslib_1.__importDefault(require("fs"));
const yaml_1 = tslib_1.__importDefault(require("yaml"));
const config_1 = require("../config");
const path_1 = tslib_1.__importDefault(require("path"));
const logger_1 = require("./logger");
/**
 * Accepts command line options and YAML options, and then returns result.
 */
const resolveCommandOptions = (cmd) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    const yml = getYamlOptions(cmd.configFile);
    const namespace = (_c = (_a = cmd.namespace) !== null && _a !== void 0 ? _a : (_b = yml.namespaces) === null || _b === void 0 ? void 0 : _b.target) !== null && _c !== void 0 ? _c : config_1.config.namespaces.target;
    const availableNamespaces = (_f = (_d = cmd.availableNamespaces) !== null && _d !== void 0 ? _d : (_e = yml.namespaces) === null || _e === void 0 ? void 0 : _e.other) !== null && _f !== void 0 ? _f : config_1.config.namespaces.other;
    const group = (_h = (_g = cmd.group) !== null && _g !== void 0 ? _g : yml.group) !== null && _h !== void 0 ? _h : path_1.default.basename(path_1.default.resolve());
    if (!availableNamespaces.includes(namespace)) {
        availableNamespaces.push(namespace);
    }
    return {
        group: group,
        baseLang: (_l = (_j = cmd.baseLang) !== null && _j !== void 0 ? _j : (_k = yml.languages) === null || _k === void 0 ? void 0 : _k.base) !== null && _l !== void 0 ? _l : config_1.config.languages.base,
        langs: (_p = (_m = cmd.langs) !== null && _m !== void 0 ? _m : (_o = yml.languages) === null || _o === void 0 ? void 0 : _o.other) !== null && _p !== void 0 ? _p : config_1.config.languages.other,
        namespace,
        availableNamespaces,
        path: (_r = (_q = cmd.path) !== null && _q !== void 0 ? _q : yml.path) !== null && _r !== void 0 ? _r : config_1.config.path,
        validation: {
            mismatchedPlaceholders: (_t = (_s = yml.validation) === null || _s === void 0 ? void 0 : _s.mismatchedPlaceholders) !== null && _t !== void 0 ? _t : [],
        },
        outputDir: ((_v = (_u = cmd.outputDir) !== null && _u !== void 0 ? _u : yml.outputDir) !== null && _v !== void 0 ? _v : config_1.config.outputDir).replace(/{{group}}/, group),
    };
};
exports.resolveCommandOptions = resolveCommandOptions;
const getYamlOptions = (configFile) => {
    try {
        const fileContents = fs_1.default.readFileSync(configFile, 'utf8');
        const yml = yaml_1.default.parse(fileContents);
        return yml;
    }
    catch (err) {
        logger_1.logWarn(`(No YAML config file detected: "${configFile}" -- ${err})`);
        return {};
    }
};
//# sourceMappingURL=resolveOptions.js.map