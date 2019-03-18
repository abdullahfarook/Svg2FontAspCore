import * as grunt from 'grunt';
import { IDeffered } from './Core/IDeffered';
import { setTimeout } from 'timers';
import { ICallback } from './Core/ICallback';
export 
    class GruntFont {
    private _deffered: IDeffered[] = [];
    private _grunt: IGrunt;
    private _tasks: string[] = [];
    constructor() {
        process.chdir(__dirname);
        var config = require('./Gruntfile');
        config(grunt);
        //var name = 'Abdullah';
        //grunt.initConfig({
        //    config: {
        //        name: name
        //    }
        //})
        this._grunt = grunt;
    }
    public Default():GruntFont {
        this._tasks.push('default');
        grunt.registerTask('default', 'On Load Task', () => {
            console.log('Grunt runnung Default Task on Load');
            this.TaskComplete("Default Task Done");
        });
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
