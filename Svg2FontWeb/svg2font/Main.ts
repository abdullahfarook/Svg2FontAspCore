import { ICallback } from "./Core/ICallback";
import { GruntFont } from "./GruntWebFont";
import { Webfont } from "./Core/Arguments/WebFontArgs";

export function Main(callback: ICallback, data: any) {
    var svg2Font = new GruntFont()
        .AddConfig(new Webfont())
        .ReturnGruntException(true)
        //.DefaultTask()
        .CreateTemp()
        //.FailPassTask()
        .WebFontTask()
        .SuccessTask()
        //.CleanTask()
        .Build()
        .then(x => {
        console.log("Promise Resolve From Main.ts");
        console.log(`Result: ${x}`);
        callback(null, x);
        })
        .catch((x:Error) =>
        {
            console.log(`${x.message} => Main.ts`);
            callback(x);
        });
}
