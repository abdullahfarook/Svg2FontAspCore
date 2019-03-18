import * as grunt from 'grunt';
import { IDeffered } from './Core/IDeffered';
import { setTimeout } from 'timers';
import { ICallback } from './Core/ICallback';
import { Webfont } from './Core/FontArgs';
export 
    class GruntFont {
    private _deffered: IDeffered[] = [];
    private _grunt: IGrunt;
    private _tasks: string[] = [];
    private _config: grunt.config.IProjectConfig = { default: {} };
    constructor() {
        process.chdir(__dirname);
        var config = require('./Gruntfile');
        config(grunt);

        this._grunt = grunt;
    }
    public AddConfig(config: Webfont): GruntFont {

        // Concating objects
        this._config =
            {...this._config, ...{
                webfont:config
            }
        }
        console.log(this._config);
        return this;
    }
    public DefaultTask():GruntFont {
        this._tasks.push('default');
        grunt.registerTask('default', 'On Load Task', () => {
            console.log('Grunt runnung Default Task on Load');
            console.log(this._grunt.config.get('default.icons,src'));
            this.TaskComplete("Default Task Done");
        });
        return this;
    }
    public WebFontTask(): GruntFont {
        this._tasks.push('webfont');
        grunt.loadNpmTasks('grunt-webfont');
        return this;
    }
    public Build(): Promise<any> {
        return new Promise<any>((res, rej) => {
            this._deffered.push({ resolve: res, reject: rej });
            this._grunt.tasks(this._tasks);
        })
    }
    private TaskComplete(data?: any) {
        var done = this._grunt.task.current.async();
        done();
        this._deffered[0].resolve([data]);
    }
}
