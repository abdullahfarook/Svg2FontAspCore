"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Path = require("path");
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
        this.src = Path.join(__dirname, '../../wwwroot/svg/*.svg');
        this.dest = Path.join(__dirname, '../../wwwroot/font');
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
//# sourceMappingURL=FontArgs.js.map