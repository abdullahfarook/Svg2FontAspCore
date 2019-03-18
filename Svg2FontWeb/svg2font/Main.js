"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GruntWebFont_1 = require("./GruntWebFont");
function Main(callback, data) {
    var svg2Font = new GruntWebFont_1.GruntFont();
    svg2Font
        .Default()
        .Build()
        .then(function (x) {
        console.log("Promise Result " + x);
        callback(null, x);
    })
        .catch(function (x) { return callback(x); });
}
exports.Main = Main;
//# sourceMappingURL=Main.js.map