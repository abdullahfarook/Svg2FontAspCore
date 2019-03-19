import { ICallback } from "./Core/ICallback";
import { GruntFont } from "./GruntWebFont";
import { Webfont } from "./Core/Arguments/WebFontArgs";

export function Main(callback: ICallback, data: any) {
    var svg2Font = new GruntFont()
        .AddConfig(new Webfont())
        .CreateTemp()
        .WebFontTask()
        .Build()
        .then(x => {
        console.log("Promise Resolve From Main.ts");
        console.log(`Result: ${x}`);
        callback(null, x);
        })
        .catch(x =>
        {
            console.log(`Error ${x}`)
        });
}
