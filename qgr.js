#! /usr/bin/env node

const replace = require('replace');
const exec = require('child_process').exec;
const pathArg = process.argv.slice(2);
const findArg = process.argv.slice(3);
const replaceArg = process.argv.slice(4);

//const searchPattern = "-r -l 'localhost:1111/sit' ./content/src/main/content/jcr_root/etc/designs/zig";

const qgrInit = exec('grep -l -r' + findArg + pathArg, function(err,stdout,stderr) {
  let arr = stdout.split("\n");
  arr.pop();
  arr.length <= 0 ? console.log('fail, not found: ', findArg) : console.log('success, files found: ', arr.length);
  console.log('files updated:\n', arr);
  replace({
      regex: findArg,
      replacement: replaceArg,
      paths: arr,
      recursive: true,
      silent: true
  });
});
