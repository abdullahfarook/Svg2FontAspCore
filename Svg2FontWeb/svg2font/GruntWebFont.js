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
var Utils_1 = require("./Core/Utils");
var GruntFont = /** @class */ (function () {
    function GruntFont() {
        this._tasks = [];
        //private _fontConfig: WebFontArgs;
        this._gruntConfig = {
            done: { options: {} }
        };
        this._result = {};
        process.chdir(__dirname);
        var config = require('./Gruntfile');
        config(grunt);
        this._grunt = grunt;
        this.RegisterAllDone();
    }
    GruntFont.prototype.AddConfig = function (config) {
        // Concating objects
        this._gruntConfig = __assign({}, this._gruntConfig, {
            webfont: config
        });
        return this;
    };
    GruntFont.prototype.DefaultTask = function () {
        var _this = this;
        this._tasks.push('default');
        this._grunt.registerTask('default', 'On Load Task', function () {
            console.log('Grunt runnung Default Task on Load');
            console.log(_this._grunt.config.get('default.icons,src'));
            _this.TaskComplete("Default Task Done");
        });
        return this;
    };
    GruntFont.prototype.CreateTemp = function () {
        temp.track();
        Utils_1.Utils.TempDir = temp.mkdirSync();
        //var tempName = temp.path({ dir: Utils.DestDir });
        //Utils.TempDir = tempName;
        return this;
    };
    GruntFont.prototype.FailPassTask = function () {
        this._tasks.unshift('failpass');
        return this;
    };
    GruntFont.prototype.WebFontTask = function () {
        this._tasks.unshift('webfont');
        //console.log(Utils.TempDir);
        //if (Utils.TempDir) { this._fontConfig. }
        this._grunt.loadNpmTasks('grunt-webfont');
        return this;
    };
    GruntFont.prototype.ZipTask = function () {
        this._tasks.push('zip');
        this._grunt.loadNpmTasks('grunt-zip');
        return this;
    };
    GruntFont.prototype.Build = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this._deffered = { resolve: res, reject: rej };
            console.log(_this._gruntConfig);
            _this._grunt.initConfig(_this._gruntConfig);
            _this._grunt.tasks(_this._tasks);
        });
    };
    GruntFont.prototype.RegisterAllDone = function (data) {
        var _this = this;
        this._tasks.push('done');
        this._grunt.registerTask('done', 'on All Tasks done', function () {
            _this._deffered.resolve(_this._result.data);
            console.log('All Tasks Done from GruntWebFont Class');
            _this.TaskComplete();
        });
    };
    GruntFont.prototype.TaskComplete = function (data) {
        var done = this._grunt.task.current.async();
        done();
    };
    GruntFont.prototype.Exception = function (error) {
        this._deffered.reject(error);
    };
    return GruntFont;
}());
exports.GruntFont = GruntFont;
//# sourceMappingURL=GruntWebFont.js.map