import * as grunt from 'grunt';
import { IDeffered } from './Core/IDeffered';
import * as temp from 'temp';
import { Utils } from './Core/Utils';
import { WebfontConfig } from './Core/Arguments/WebFontArgs';
import { CompressArgs } from './Core/Arguments/CompressArgs';
export 
    class GruntFont {
    private _deffered: IDeffered;
    private _grunt: IGrunt;
    private _tasks: string[] = [];
    private _fontConfig: WebfontConfig;
    private _compressConfig: CompressArgs;
    private _gruntConfig: grunt.config.IProjectConfig = {
        deafult: { optins: {}},
        clean: { options: {}} };
    private _result: any = {};
    private _error: any;
    constructor(fontConfig: WebfontConfig) {
        process.chdir(__dirname);
        var config = require('./Gruntfile');
        config(grunt);
        this._grunt = grunt;
        this._fontConfig = fontConfig;
        //this.RegisterAllDone();
        this._grunt.option('force', false);
        //var gruntLogWarn = grunt.log.warn;
        //grunt.log.warn = function (error) {
        //    var pattern = new RegExp("^Source file (.*) not found.$");
        //    if (pattern.test(error)) {
        //        grunt.fail.warn(error);
        //    } else {
        //        gruntLogWarn(error);
        //    }
        //};

        //this._grunt.fail.fatal = function (ex: any) {
        //    console.log('grunt fatal');
        //}
        //this._grunt.event.on('exit', function (e: any) {
        //    console.log('grunt exit', e);
        //});
        //this._grunt.fail.warn = function (ex: any) {
        //    console.log('grunt warn',ex);
        //}
    }
    //public AddConfigs(config: WebfontConfig): GruntFont {

    //    // Concating objects
    //    //this._gruntConfig =
    //    //    {
    //    //        ...this._gruntConfig, ...{
    //    //        webfont:config
    //    //    }
    //    //}
    //    this._fontConfig = config;
    //    return this;
    //}
        //public FailPassTask(): GruntFont {
    //    this._tasks.push('passfail');
    //    this._gruntConfig = {
    //        ...this._gruntConfig, ...
    //        {
    //            passfail: {
    //                options: {
    //                    force: true
    //                },
    //                all: {
    //                    success: function () {
    //                        console.log("Cool :)")
    //                    },
    //                    fail: function () {
    //                        console.log("Task Failed :'(")
    //                    },
    //                    error: function () {
    //                        console.log("Error :'(")
    //                    }
    //                }
    //            }
    //        }
    //    }
    //    grunt.loadNpmTasks('grunt-passfail');
    //    return this;
    //}
    //private TaskComplete(data?: any) {
    //    var done = this._grunt.task.current.async();
    //    done();
    //}
     //public CleanTask(data?: any): GruntFont {
    //    this._tasks.push('clean');
    //    this._grunt.registerTask('clean', 'on All Tasks done', () => {
    //        //this._deffered.resolve(this._result.data);
    //        console.log('All Tasks Clean from GruntWebFont Class');
    //        //this.TaskComplete();
    //    });
    //    return this;
    //}
    //private Exception(error:any) {
    //    this._deffered.reject(error);
    //}
    //public ZipTask(): GruntFont {
    //    this._tasks.push('zip');
    //    this._grunt.loadNpmTasks('grunt-zip');
    //    return this;
    //}
    //public DefaultTask():GruntFont {
    //    this._tasks.push('default');
    //    this._grunt.registerTask('default', 'On Load Task', () => {
    //        console.log('Grunt runnung Default Task on Load');
    //        this._grunt.option("force", false);
    //        //var done = this._grunt.task.current.async();

    //        //try {
    //        //    this._grunt.task.run(this._tasks);
    //        //} catch (e) {
    //        //    done(new Error(e));
    //        //    this._deffered.reject(e);
    //        //}
            
    //        //done();
    //        //console.log(this._grunt.config.get('default.icons,src'));
    //        //this.TaskComplete("Default Task Done");
    //    });
    //    return this;
    //}
    public WebFontTask(): GruntFont {
        this._tasks.unshift('webfont');
        //console.log(Utils.TempDir);
        //if (Utils.TempDir) {
        //    console.log(`Temp Folder: ${Utils.TempDir}`);
        //}
        this._grunt.loadNpmTasks('grunt-webfont');
        return this;
    }
    public CreateTempAndZipTask(): GruntFont {
        // Create Temp folder
        temp.track();
        var tempFolder = temp.mkdirSync();
        this._fontConfig.config.dest = tempFolder;

        // Compressing settings and registration in grunt
        this._compressConfig = new CompressArgs();
        console.log(this._compressConfig.config.options);
        console.log(tempFolder + '\\**.html');
        this._compressConfig.config.files[0].cwd = tempFolder + '\\';
        //this._compressConfig.config.files[0].src = ['*.html','*.css'];
        this._compressConfig.config.files[0].src = ['**'];
        console.log(this._compressConfig.config.files[0]);
        this._tasks.push('compress');
        grunt.loadNpmTasks('grunt-contrib-compress');
        return this;
    }
    public Build(): Promise<any> {
        return new Promise<any>((res, rej) => {
            this._deffered = { resolve: res, reject: rej };
            this.RegisterConfigs();
            console.log(this._gruntConfig);
            this._grunt.initConfig(this._gruntConfig);
            console.log(this._tasks);
            this._grunt.registerTask('default', this._tasks);
            //this._grunt.tasks(this._tasks);
            this._grunt.tasks('default');
        })
    }
    private RegisterConfigs() {
        if (this._gruntConfig) {
            //this._fontConfig.icons.src = __dirname;
            this._gruntConfig = {
                ...this._gruntConfig, ...{
                    webfont:this._fontConfig
                }}
        }
        if (this._compressConfig) {
            this._gruntConfig = {
                ...this._gruntConfig, ...{
                    compress: this._compressConfig
                }
            }
        }
        console.log(this._grunt.config);

       
       
    }
    public SuccessTask(): GruntFont {
        this._tasks.push('success');
        this._grunt.registerTask('success', 'on All Tasks done', () => {
            this._deffered.resolve("Success");
            console.log('All Tasks Success from GruntWebFont Class');
        });
        return this;
    }
    public ReturnGruntException(exitOnWarn:boolean):GruntFont {

        this._grunt.util.exit = (e) => {
            if (!(e === 0)) {
                //console.log('Grunt Error', e);
                //this._grunt.fail.warn('Stopped');
                this._deffered.reject(this._error);
                this._grunt.task.clearQueue();
                //process.exit(1);
            }
        };

        if (exitOnWarn) {
            var g = this._grunt as any;
            //var gruntLogWarn = g.log.warn;
            g.log.warn = (error: any)=> {
                //gruntLogWarn(error); // The original warning.
                this._error = new Error(error);
                grunt.fail.warn(error); // Forced stop.
            };
            return this;
        }
        return this;
    }
    public RegisterCleanup():GruntFont {
        process.on('exit', (code) => {
            console.log('Cleanup', code);
            temp.cleanupSync();
            // Cleanup
        });
        return this;
    }  
}
