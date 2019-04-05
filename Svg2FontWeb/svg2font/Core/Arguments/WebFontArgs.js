"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var WebfontConfig = /** @class */ (function () {
    function WebfontConfig() {
        this.config = new Config();
    }
    return WebfontConfig;
}());
exports.WebfontConfig = WebfontConfig;
var Config = /** @class */ (function () {
    function Config() {
        this.src = Utils_1.Utils.FromCurrentDir('../../wwwroot/svg/*.svg');
        this.dest = Utils_1.Utils.FromCurrentDir('../../wwwroot/font/');
        this.options = new Options();
    }
    return Config;
}());
var Options = /** @class */ (function () {
    function Options() {
        this.fontFilename = 'brackclay';
        this.fontFamilyName = 'brickClay';
        this.templateOptions = new TemplateOptions();
    }
    return Options;
}());
exports.Options = Options;
var TemplateOptions = /** @class */ (function () {
    function TemplateOptions() {
        this.baseClass = 'icon';
        this.classPrefix = 'icon';
    }
    return TemplateOptions;
}());
exports.TemplateOptions = TemplateOptions;
//# sourceMappingURL=WebFontArgs.js.map