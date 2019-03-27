"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var CompressArgs = /** @class */ (function () {
    function CompressArgs() {
        this.config = new Config();
    }
    return CompressArgs;
}());
exports.CompressArgs = CompressArgs;
var Config = /** @class */ (function () {
    function Config() {
        this.options = new Options();
        this.files = [new File()];
        //dest: string = Utils.FromCurrentDir('../../wwwroot/font/');
    }
    return Config;
}());
var File = /** @class */ (function () {
    function File() {
        this.src = [];
        this.expand = true;
        //dest: string = Utils.FromCurrentDir('../../wwwroot/font/');
    }
    return File;
}());
var Options = /** @class */ (function () {
    function Options() {
        this.archive = Utils_1.Utils.FromCurrentDir('../../wwwroot/font/icoons.zip');
        this.mode = 'zip';
    }
    return Options;
}());
//# sourceMappingURL=CompressArgs.js.map