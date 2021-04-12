"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDir = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const removeDir = function (path) {
    if (fs_1.default.existsSync(path)) {
        const files = fs_1.default.readdirSync(path);
        if (files.length > 0) {
            files.forEach(function (filename) {
                if (fs_1.default.statSync(path + '/' + filename).isDirectory()) {
                    exports.removeDir(path + '/' + filename);
                }
                else {
                    fs_1.default.unlinkSync(path + '/' + filename);
                }
            });
            fs_1.default.rmdirSync(path);
        }
        else {
            fs_1.default.rmdirSync(path);
        }
    }
    else {
        throw 'Directory path not found.';
    }
};
exports.removeDir = removeDir;
//# sourceMappingURL=removeDir.js.map