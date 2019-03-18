"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GruntWebFont_1 = require("./GruntWebFont");
var FontArgs_1 = require("./Core/FontArgs");
function Main(callback, data) {
    var svg2Font = new GruntWebFont_1.GruntFont()
        .AddConfig(new FontArgs_1.Webfont())
        .WebFontTask()
        .Build()
        .then(function (x) {
        console.log("Result: " + x);
        callback(null, x);
    })
        .catch(function (x) {
        console.log("Error " + x);
    });
}
exports.Main = Main;
//# sourceMappingURL=Main.js.map