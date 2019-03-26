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
            return this._tempDir;
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
    Utils.PauseConsole = function () {
        var num = getInput();
        function dealWithInput(str) {
            console.log(str);
        }
        function getInput() {
            var readline = require('readline');
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('', function (ans) {
                rl.close();
                dealWithInput(ans);
            });
        }
    };
    Utils.IsDebug = function () {
        var argv = process.execArgv.join();
        return argv.includes('inspect') || argv.includes('debug');
    };
    Utils._currentDir = __dirname;
    Utils._srcDir = Path.join(Utils._currentDir, '../../wwwroot/svg/');
    Utils._destDir = Path.join(Utils._currentDir, '../../wwwroot/font/');
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map