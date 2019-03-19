"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var Webfont = /** @class */ (function () {
    function Webfont() {
        this.icons = new Icons();
    }
    return Webfont;
}());
exports.Webfont = Webfont;
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