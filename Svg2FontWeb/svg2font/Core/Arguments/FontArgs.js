"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var WebFontArgs = /** @class */ (function () {
    function WebFontArgs() {
        this.icons = new Icons();
    }
    return WebFontArgs;
}());
exports.WebFontArgs = WebFontArgs;
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
//# sourceMappingURL=FontArgs.js.map