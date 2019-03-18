import * as Path from 'path';
export 
    class Webfont {
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
        this.src = Path.join(__dirname, '../../wwwroot/svg/*.svg');
        this.dest = Path.join(__dirname, '../../wwwroot/font');
    }
    options: Options;
}

class Options {
    fontFilename= 'brackclay';
    fontFamilyName = 'brickClay'
}

