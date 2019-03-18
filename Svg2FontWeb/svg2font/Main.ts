import { ICallback } from "./Core/ICallback";
import { GruntFont } from "./GruntWebFont";

export function Main(callback: ICallback, data: any) {
    var svg2Font = new GruntFont();
    svg2Font
        .Default()
        .Build()
        .then(x => {
        console.log(`Promise Result ${x}`);
        callback(null, x);
        })
        .catch(x => callback(x));
}
