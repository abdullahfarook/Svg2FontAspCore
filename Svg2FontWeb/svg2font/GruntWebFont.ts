import * as grunt from 'grunt';
import { IDeffered } from './Core/IDeffered';
import * as temp from 'temp';
import { Utils } from './Core/Utils';
export 
    class GruntFont {
    private _deffered: IDeffered;
    private _grunt: IGrunt;
    private _tasks: string[] = [];
    //private _fontConfig: WebFontArgs;
    private _gruntConfig: grunt.config.IProjectConfig = {
        done: { options: {}} };
    private _result: any = {};
    constructor() {
        process.chdir(__dirname);
        var config = require('./Gruntfile');
        config(grunt);
        this._grunt = grunt;
        this.RegisterAllDone();
    }
    public AddConfig(config: ITaskConfig): GruntFont {

        // Concating objects
        this._gruntConfig =
            {
                ...this._gruntConfig, ...{
                webfont:config
            }
        }
        return this;
    }
    public DefaultTask():GruntFont {
        this._tasks.push('default');
        this._grunt.registerTask('default', 'On Load Task', () => {
            console.log('Grunt runnung Default Task on Load');
            console.log(this._grunt.config.get('default.icons,src'));
            this.TaskComplete("Default Task Done");
        });
        return this;
    }
    public CreateTemp(): GruntFont {
        temp.track();
        Utils.TempDir = temp.mkdirSync();
        //var tempName = temp.path({ dir: Utils.DestDir });
        //Utils.TempDir = tempName;
        return this;
    }
    public FailPassTask(): GruntFont {
        this._tasks.unshift('failpass');
        return this;
    }
    public WebFontTask(): GruntFont {
        this._tasks.unshift('webfont');
        //console.log(Utils.TempDir);
        //if (Utils.TempDir) { this._fontConfig. }
        this._grunt.loadNpmTasks('grunt-webfont');
        return this;
    }
    public ZipTask(): GruntFont {
        this._tasks.push('zip');
        this._grunt.loadNpmTasks('grunt-zip');
        return this;
    }
    public Build(): Promise<any> {
        return new Promise<any>((res, rej) => {
            this._deffered = { resolve: res, reject: rej };
            console.log(this._gruntConfig);
            this._grunt.initConfig(this._gruntConfig);
            this._grunt.tasks(this._tasks);
        })
    }
    private RegisterAllDone(data?: any) {
        this._tasks.push('done');
        this._grunt.registerTask('done', 'on All Tasks done', () => {
            this._deffered.resolve(this._result.data);
            console.log('All Tasks Done from GruntWebFont Class');
            this.TaskComplete();
        });
    }
    private TaskComplete(data?: any) {
        var done = this._grunt.task.current.async();
        done();
    }
    private Exception(error:any) {
        this._deffered.reject(error);
    }
}
