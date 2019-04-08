import { ICallback } from "./Core/ICallback";
import { GruntFont } from "./GruntWebFont";
import { WebfontConfig, Options, WebFontReq } from "./Core/Arguments/WebFontArgs";
export function Main(callback: ICallback, args: WebFontReq) {
    var webConfig = new WebfontConfig();

    var options = new Options();
    if (args.fontFamilyName) options.fontFamilyName = args.fontFamilyName;

    if (args.clasPrefix) options.templateOptions.classPrefix = args.clasPrefix;

    if (args.ie7) options.ie7 = true;

    if (args.sass) options.stylesheets.push('scss');

    if (args.baseClass) options.templateOptions.baseClass = args.baseClass;

    webConfig.config.options = options;
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
