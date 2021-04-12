"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = void 0;
const tslib_1 = require("tslib");
const archiver_1 = tslib_1.__importDefault(require("archiver"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const zip = (source, out) => {
    const archive = archiver_1.default('zip', { zlib: { level: 9 } });
    const stream = fs_1.default.createWriteStream(out);
    return new Promise((resolve, reject) => {
        archive
            .directory(source, false)
            .on('error', err => reject(err))
            .pipe(stream);
        stream.on('close', () => resolve());
        archive.finalize();
    });
};
exports.zip = zip;
//# sourceMappingURL=zip.js.map