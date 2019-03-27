"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GruntWebFont_1 = require("./GruntWebFont");
var WebFontArgs_1 = require("./Core/Arguments/WebFontArgs");
function Main(callback, data) {
    var svg2Font = new GruntWebFont_1.GruntFont(new WebFontArgs_1.WebfontConfig())
        .ReturnGruntException(true)
        //.DefaultTask()
        .CreateTempAndZipTask()
        //.FailPassTask()
        .WebFontTask()
        .SuccessTask()
        .RegisterCleanup()
        //.CleanTask()
        .Build()
        .then(function (x) {
        console.log("Promise Resolve From Main.ts");
        console.log("Result: " + x);
        callback(null, x);
    })
        .catch(function (x) {
        if (x) {
            console.log(x.message + " => Main.ts");
            callback(x);
        }
        else {
            callback(new Error('Error Occured in generating fonts'));
        }
    });
}
exports.Main = Main;
//# sourceMappingURL=Main.js.map