"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Path = require("path");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Object.defineProperty(Utils, "CurrentDir", {
        get: function () {
            return this._currentDir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils, "SrcDir", {
        get: function () {
            return this._srcDir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils, "DestDir", {
        get: function () {
            return this._destDir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils, "TempDir", {
        get: function () {
            if (this._tempDir) {
                return this._tempDir;
            }
            else {
                throw new Error("Temporary Directory is not set");
            }
        },
        set: function (path) {
            this._tempDir = path;
        },
        enumerable: true,
        configurable: true
    });
    Utils.FromCurrentDir = function (path) {
        return Path.join(__dirname, path);
    };
    Utils._currentDir = __dirname;
    Utils._srcDir = Path.join(Utils._currentDir, '../../wwwroot/svg/');
    Utils._destDir = Path.join(Utils._currentDir, '../../wwwroot/font/');
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map