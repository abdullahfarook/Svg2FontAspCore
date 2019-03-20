"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./Main");
var Utils_1 = require("./Core/Utils");
Main_1.Main(function (error, result) {
    if (error) {
        console.log(error.message + " => Server.ts");
    }
    else {
        console.log("Promise Resolved Result: " + result + " => Server.ts");
    }
}, "arg");
if (IsDebug) {
    Utils_1.Utils.PauseConsole();
}
function IsDebug() {
    var argv = process.execArgv.join();
    return argv.includes('inspect') || argv.includes('debug');
}
//# sourceMappingURL=Server.js.map