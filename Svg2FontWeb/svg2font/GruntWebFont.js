"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var grunt = require("grunt");
var temp = require("temp");
var CompressArgs_1 = require("./Core/Arguments/CompressArgs");
var GruntFont = /** @class */ (function () {
    function GruntFont(fontConfig) {
        this._tasks = [];
        this._gruntConfig = {
            deafult: { optins: {} },
            clean: { options: {} }
        };
        this._result = {};
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
    GruntFont.prototype.WebFontTask = function () {
        this._tasks.unshift('webfont');
        //console.log(Utils.TempDir);
        //if (Utils.TempDir) {
        //    console.log(`Temp Folder: ${Utils.TempDir}`);
        //}
        this._grunt.loadNpmTasks('grunt-webfont');
        return this;
    };
    GruntFont.prototype.CreateTempAndZipTask = function () {
        // Create Temp folder
        temp.track();
        var tempFolder = temp.mkdirSync();
        this._fontConfig.config.dest = tempFolder;
        // Compressing settings and registration in grunt
        this._compressConfig = new CompressArgs_1.CompressArgs();
        console.log(this._compressConfig.config.options);
        console.log(tempFolder + '\\**.html');
        this._compressConfig.config.files[0].cwd = tempFolder + '\\';
        //this._compressConfig.config.files[0].src = ['*.html','*.css'];
        this._compressConfig.config.files[0].src = ['**'];
        console.log(this._compressConfig.config.files[0]);
        this._tasks.push('compress');
        grunt.loadNpmTasks('grunt-contrib-compress');
        return this;
    };
    GruntFont.prototype.Build = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this._deffered = { resolve: res, reject: rej };
            _this.RegisterConfigs();
            console.log(_this._gruntConfig);
            _this._grunt.initConfig(_this._gruntConfig);
            console.log(_this._tasks);
            _this._grunt.registerTask('default', _this._tasks);
            //this._grunt.tasks(this._tasks);
            _this._grunt.tasks('default');
        });
    };
    GruntFont.prototype.RegisterConfigs = function () {
        if (this._gruntConfig) {
            //this._fontConfig.icons.src = __dirname;
            this._gruntConfig = __assign({}, this._gruntConfig, {
                webfont: this._fontConfig
            });
        }
        if (this._compressConfig) {
            this._gruntConfig = __assign({}, this._gruntConfig, {
                compress: this._compressConfig
            });
        }
        console.log(this._grunt.config);
    };
    GruntFont.prototype.SuccessTask = function () {
        var _this = this;
        this._tasks.push('success');
        this._grunt.registerTask('success', 'on All Tasks done', function () {
            _this._deffered.resolve("Success");
            console.log('All Tasks Success from GruntWebFont Class');
        });
        return this;
    };
    GruntFont.prototype.ReturnGruntException = function (exitOnWarn) {
        var _this = this;
        this._grunt.util.exit = function (e) {
            if (!(e === 0)) {
                //console.log('Grunt Error', e);
                //this._grunt.fail.warn('Stopped');
                _this._deffered.reject(_this._error);
                _this._grunt.task.clearQueue();
                //process.exit(1);
            }
        };
        if (exitOnWarn) {
            var g = this._grunt;
            //var gruntLogWarn = g.log.warn;
            g.log.warn = function (error) {
                //gruntLogWarn(error); // The original warning.
                _this._error = new Error(error);
                grunt.fail.warn(error); // Forced stop.
            };
            return this;
        }
        return this;
    };
    GruntFont.prototype.RegisterCleanup = function () {
        process.on('exit', function (code) {
            console.log('Cleanup', code);
            temp.cleanupSync();
            // Cleanup
        });
        return this;
    };
    return GruntFont;
}());
exports.GruntFont = GruntFont;
//# sourceMappingURL=GruntWebFont.js.map