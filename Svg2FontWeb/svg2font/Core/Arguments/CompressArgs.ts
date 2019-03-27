import { Utils } from "../Utils";
import { publicDecrypt } from "crypto";

export 
    class CompressArgs implements ITaskConfig {
    config: Config = new Config();
}
class Config {
    options: Options = new Options();
    files: File[] = [new File()];
    //dest: string = Utils.FromCurrentDir('../../wwwroot/font/');
}
class File {
    src: string[] = [];
    cwd: string;
    expand = true;
    //dest: string = Utils.FromCurrentDir('../../wwwroot/font/');
}
class Options {
    archive = Utils.FromCurrentDir('../../wwwroot/font/icoons.zip');
    mode = 'zip';
}