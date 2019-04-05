import { ICallback } from "./Core/ICallback";
import { GruntFont } from "./GruntWebFont";
import { WebfontConfig, Options } from "./Core/Arguments/WebFontArgs";
export function Main(callback: ICallback, data: any) {
    var webConfig = new WebfontConfig();
    var options = new Options();
    var argument = data as Options;
    webConfig.config.options = {
        ...options, ...argument
    };
    console.log(webConfig.config.options);
    new GruntFont(webConfig)
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
    .then(x => {
    console.log("Promise Resolve From Main.ts");
    console.log(`Result: ${x}`);
        callback(null, x);
        process.exit();
    })
    .catch((x:Error) =>
    {
        if (x) {
            console.log(`${x.message} => Main.ts`);
            callback(x);
        } else {
            callback('Error Occured in generating fonts');
        }
        process.exit();
        });
}
