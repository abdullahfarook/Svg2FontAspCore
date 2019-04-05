"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var GruntWebFont_1 = require("./GruntWebFont");
var WebFontArgs_1 = require("./Core/Arguments/WebFontArgs");
function Main(callback, data) {
    var webConfig = new WebFontArgs_1.WebfontConfig();
    var options = new WebFontArgs_1.Options();
    var argument = data;
    webConfig.config.options = __assign({}, options, argument);
    console.log(webConfig.config.options);
    new GruntWebFont_1.GruntFont(webConfig)
        .ReturnGruntException(true)
        //.DefaultTask()
        .CreateTempAndZipTask()
        //.FailPassTask()
        .WebFontTask()
        .SuccessTask()
        .RegisterCleanup()
        .GruntKillTask()
        //.CleanTask()
        .Build()
        .then(function (x) {
        console.log("Promise Resolve From Main.ts");
        console.log("Result: " + x);
        callback(null, x);
        process.exit();
    })
        .catch(function (x) {
        if (x) {
            console.log(x.message + " => Main.ts");
            callback(x);
        }
        else {
            callback('Error Occured in generating fonts');
        }
        process.exit();
    });
}
exports.Main = Main;
//# sourceMappingURL=Main.js.map