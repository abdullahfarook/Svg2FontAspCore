"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grunt = require("grunt");
var GruntFont = /** @class */ (function () {
    function GruntFont() {
        this._deffered = [];
        this._tasks = [];
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
    GruntFont.prototype.Default = function () {
        var _this = this;
        this._tasks.push('default');
        grunt.registerTask('default', 'On Load Task', function () {
            console.log('Grunt runnung Default Task on Load');
            _this.TaskComplete("Default Task Done");
        });
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