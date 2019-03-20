import * as Path from 'path';
export 
    class Utils {
    private static _currentDir = __dirname;
    private static _srcDir = Path.join(Utils._currentDir, '../../wwwroot/svg/')
    private static _destDir = Path.join(Utils._currentDir, '../../wwwroot/font/')
    private static _tempDir: string;
    static get CurrentDir(): string {
        return this._currentDir;
    }
    static get SrcDir(): string {
        return this._srcDir;
    }
    static get DestDir(): string {
        return this._destDir;
    }
    static get TempDir(): string {
        if (this._tempDir) {
            return this._tempDir;
        } else {
            throw new Error("Temporary Directory is not set");
        }
    }
    static set TempDir(path:string){
        this._tempDir = path;
    }
    public static FromCurrentDir(path:string): string {
            return Path.join(__dirname, path);
    }
    public static PauseConsole() {
        var num = getInput();
        function dealWithInput(str: any) {
            console.log(str)
        }

        function getInput() {
            const readline = require('readline');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('', (ans: any) => {
                rl.close();
                dealWithInput(ans);
            });
        }
    }
    public static IsDebug(): boolean {
        const argv = process.execArgv.join();
        return argv.includes('inspect') || argv.includes('debug');
    }
}
