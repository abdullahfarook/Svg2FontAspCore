"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GruntWebFont_1 = require("./GruntWebFont");
var WebFontArgs_1 = require("./Core/Arguments/WebFontArgs");
function Main(callback, args) {
    var webConfig = new WebFontArgs_1.WebfontConfig();
    var options = new WebFontArgs_1.Options();
    if (args.fontFamilyName)
        options.fontFamilyName = args.fontFamilyName;
    if (args.clasPrefix)
        options.templateOptions.classPrefix = args.clasPrefix;
    if (args.ie7)
        options.ie7 = true;
    if (args.sass)
        options.stylesheets.push('scss');
    if (args.baseClass)
        options.templateOptions.baseClass = args.baseClass;
    webConfig.config.options = options;
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