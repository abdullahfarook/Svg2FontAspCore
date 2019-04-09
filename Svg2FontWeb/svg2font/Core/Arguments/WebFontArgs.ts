import { Utils } from '../Utils';
export interface WebFontReq {
    fontFamilyName: string;
    clasPrefix: string;
    ie7: boolean;
    sass: boolean;
    baseClass: string;
}
export 
    class WebfontConfig implements ITaskConfig {
    config: Config= new Config();
}

class Config {
    src: string = Utils.FromCurrentDir('../../wwwroot/svg/*.svg');
    dest: string = Utils.FromCurrentDir('../../wwwroot/font/');
    options: Options = new Options();
}

export class Options {
    fontFilename= 'brackclay';
    fontFamilyName = 'brickClay';
    templateOptions = new TemplateOptions();
    stylesheets = ['css'];
    ie7 = false;
    engine = 'node';
}
export class TemplateOptions {
    baseClass = 'icon';
    classPrefix = 'icon-';
}

