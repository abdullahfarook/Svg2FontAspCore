import { Utils } from '../Utils';
export 
    class WebfontConfig implements ITaskConfig {
    constructor() {
        this.icons = new Icons();
    }
    icons: Icons;
}

class Icons {
    src:string;
    dest: string;
    constructor() {
        this.options = new Options();
        this.src = Utils.FromCurrentDir('../../wwwroot/svg/*.svg');
        this.dest = Utils.FromCurrentDir('../../wwwroot/font/');
    }
    options: Options;
}

class Options {
    fontFilename= 'brackclay';
    fontFamilyName = 'brickClay'
}

