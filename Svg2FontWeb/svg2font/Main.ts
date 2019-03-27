import { ICallback } from "./Core/ICallback";
import { GruntFont } from "./GruntWebFont";
import { WebfontConfig } from "./Core/Arguments/WebFontArgs";

export function Main(callback: ICallback, data: any) {
    var svg2Font = new GruntFont(new WebfontConfig())
        .ReturnGruntException(true)
        //.DefaultTask()
        .CreateTempAndZipTask()
        //.FailPassTask()
        .WebFontTask()
        .SuccessTask()
        .RegisterCleanup()
        //.CleanTask()
        .Build()
        .then(x => {
        console.log("Promise Resolve From Main.ts");
        console.log(`Result: ${x}`);
        callback(null, x);
        })
        .catch((x:Error) =>
        {
            if (x) {
                console.log(`${x.message} => Main.ts`);
                callback(x);
            } else {
                callback(new Error('Error Occured in generating fonts'));
            }         
        });
}
