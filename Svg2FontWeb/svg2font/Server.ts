import { Main } from "./Main";

Main((cb) => {
    console.log("Promise Resolve From Server.ts");
    //var num = getInput();
}, "arg");

//function dealWithInput(str:any) {
//    console.log(str)
//}

//function getInput(){
//    const readline = require('readline');
//    const rl = readline.createInterface({
//        input: process.stdin,
//        output: process.stdout
//    });
//    rl.question('Lemme test: ', (ans:any) => {
//        rl.close();
//        dealWithInput(ans);
//    });
//}