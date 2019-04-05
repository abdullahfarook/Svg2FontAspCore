import { Utils } from '../Utils';
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
}
export class TemplateOptions {
    baseClass = 'icon';
    classPrefix = 'icon';
}

