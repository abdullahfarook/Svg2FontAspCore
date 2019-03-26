"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var WebfontConfig = /** @class */ (function () {
    function WebfontConfig() {
        this.icons = new Icons();
    }
    return WebfontConfig;
}());
exports.WebfontConfig = WebfontConfig;
var Icons = /** @class */ (function () {
    function Icons() {
        this.options = new Options();
        this.src = Utils_1.Utils.FromCurrentDir('../../wwwroot/svg/*.svg');
        this.dest = Utils_1.Utils.FromCurrentDir('../../wwwroot/font/');
    }
    return Icons;
}());
var Options = /** @class */ (function () {
    function Options() {
        this.fontFilename = 'brackclay';
        this.fontFamilyName = 'brickClay';
    }
    return Options;
}());
//# sourceMappingURL=WebFontArgs.js.map