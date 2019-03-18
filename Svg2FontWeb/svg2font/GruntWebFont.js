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
var GruntFont = /** @class */ (function () {
    function GruntFont() {
        this._deffered = [];
        this._tasks = [];
        this._config = { default: {} };
        process.chdir(__dirname);
        var config = require('./Gruntfile');
        config(grunt);
        this._grunt = grunt;
    }
    GruntFont.prototype.AddConfig = function (config) {
        // Concating objects
        this._config = __assign({}, this._config, {
            webfont: config
        });
        console.log(this._config);
        return this;
    };
    GruntFont.prototype.DefaultTask = function () {
        var _this = this;
        this._tasks.push('default');
        grunt.registerTask('default', 'On Load Task', function () {
            console.log('Grunt runnung Default Task on Load');
            console.log(_this._grunt.config.get('default.icons,src'));
            _this.TaskComplete("Default Task Done");
        });
        return this;
    };
    GruntFont.prototype.WebFontTask = function () {
        this._tasks.push('webfont');
        grunt.loadNpmTasks('grunt-webfont');
        return this;
    };
    GruntFont.prototype.Build = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this._deffered.push({ resolve: res, reject: rej });
            _this._grunt.tasks(_this._tasks);
        });
    };
    GruntFont.prototype.TaskComplete = function (data) {
        var done = this._grunt.task.current.async();
        done();
        this._deffered[0].resolve([data]);
    };
    return GruntFont;
}());
exports.GruntFont = GruntFont;
//# sourceMappingURL=GruntWebFont.js.map