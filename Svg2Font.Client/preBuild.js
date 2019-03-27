const fs = require('fs');
const version = require('./package.json').version;
let angucliFilePath = './.angular-cli.json';

console.log('After build script started...');

// read our index file
console.log('About to rewrite file: ', angucliFilePath);
fs.readFile(angucliFilePath, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  // load html into cheerio so we can manipulate DOM
  const jdata = JSON.parse(data);
  jdata['apps'][0]['deployUrl'] =
    'https://cdn.jsdelivr.net/npm/@sunnygb/admin@' + version + '/';
  // var dat = require('./package.json');
  // dat.version = 0;

  console.log(jdata);
  // update html tag for proper lang
  //  $('deployUrl').val ='Hello world';
  // now write that file back
  fs.writeFile(angucliFilePath, JSON.stringify(jdata, null, '\t'), function(
    err
  ) {
    if (err) return console.log(err);
    console.log('Successfully rewrote Angular File');
  });
});

let environmentFilePath = './src/environments/environment.prod.ts';
console.log('About to rewrite file: ', environmentFilePath);
fs.readFile(environmentFilePath, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  var str = '';
  data = data
    .trim()
    .split(/[\r\n]+/g)
    .map(function(line) {
      if (line.includes('version')) {
        line = "    version: '" + version + "'";
      }
      str = str.concat(line);
      str = str.concat('\n');
    });

  // now write that file back
  fs.writeFile(environmentFilePath, str, function(err) {
    if (err) return console.log(err);
    console.log('Successfully rewrote environment file');
  });
});
