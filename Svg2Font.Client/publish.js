var exec = require('child_process').exec;

var patch = exec(
  'npm --prefix ./dist  publish --access public',
  {
    cwd: './dist'
  },
  function(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      throw error;
    }
  }
);
