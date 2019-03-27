const cheerio = require('cheerio')
const fs = require('fs');
const pkgPatch = './package.json';
const version = require(pkgPatch).version;
const indexFilePath = 'dist/index.html'
const distPkg = 'dist/package.json'
let angucliFilePath = './.angular-cli.json'
console.log('After build script started...')

// read our index file
console.log('About to rewrite file: ', indexFilePath);
fs.readFile(indexFilePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    // load html into cheerio so we can manipulate DOM
    const $ = cheerio.load(data)
    $('head').find('#styl').attr('href',"https://fonts.googleapis.com/css?family=Roboto:300,400,700|Material+Icons");
    $('head').find('#ico').attr('href',"https://cdn.jsdelivr.net/npm/@sunnygb/admin@"+version+"/favicon.png");
    // update html tag for proper lang
    console.log($('head').find('#styl'));
   	
    // now write that file back
    fs.writeFile(indexFilePath, $.html(), function (err) {
        if (err) return console.log(err);
        console.log('Successfully rewrote index html');
    });

    fs.createWriteStream(distPkg);
    fs.readFile(pkgPatch, 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          fs.writeFile(distPkg, data, function (err) {
            if (err) return console.log(err);
            console.log('Successfully copied package.json file');
        });
    });
   
  });



console.log('About to rewrite file: ', angucliFilePath);
fs.readFile(angucliFilePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    // load html into cheerio so we can manipulate DOM
    const jdata = JSON.parse(data)
    jdata['apps'][0] ['deployUrl'] = "";
    // var dat = require('./package.json');
    // dat.version = 0;

    console.log(jdata);
    // update html tag for proper lang
    //  $('deployUrl').val ='Hello world';
    // now write that file back
    fs.writeFile(angucliFilePath, JSON.stringify(jdata, null, "\t"), function (err) {
        if (err) return console.log(err);
        console.log('Successfully rewrote Angular cli html');
    });
  });