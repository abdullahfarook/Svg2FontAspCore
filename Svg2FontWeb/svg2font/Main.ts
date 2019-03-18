import { ICallback } from "./Core/ICallback";
import { GruntFont } from "./GruntWebFont";
import { Webfont } from "./Core/FontArgs";

export function Main(callback: ICallback, data: any) {
    var svg2Font = new GruntFont()
        .AddConfig(new Webfont())
        .WebFontTask()
        .Build()
        .then(x => {
        console.log(`Result: ${x}`);
        callback(null, x);
        })
        .catch(x =>
        {
            console.log(`Error ${x}`)
        });
}
