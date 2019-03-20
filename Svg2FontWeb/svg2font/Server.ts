import { Main } from "./Main";
import { Utils } from "./Core/Utils";
Main((error,result) => {
    if (error) {
        console.log(`${error.message} => Server.ts`);
    }
    else {
        console.log(`Promise Resolved Result: ${result} => Server.ts`);
    }
}, "arg");

if (IsDebug) {
    Utils.PauseConsole();
}
function IsDebug(): boolean {
    const argv = process.execArgv.join();
    return argv.includes('inspect') || argv.includes('debug');
}
