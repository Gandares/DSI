#!/usr/bin/env node
'use strict';
const watcher = require("node-watch");
const program = require('commander');
const { version, description } = require('./package.json');

program
    .version(version)
    .description(description)
    .usage('[options]')
    .option('-f, --file <fileToWatch>', 'set the file or directory to watch', '.')
    .option('-r, --recursive', 'set the directory and subdirectories to watch', false)
    
program.parse(process.argv);

const fileToWatch = program.file;

try {
  watcher(fileToWatch, { recursive: program.recursive }, (eventType, fileName) => {
    console.log(`File ${fileName} changed! Event Type: ${eventType}`);
    if (eventType === 'rename' && fileToWatch === fileName) {
      console.error(`No longer watching ${fileToWatch}!`);
      process.exit(1);
    }
  });
  console.log(`Now watching ${fileToWatch} for changes ...`);
} catch(e) {
    if (e.code === "ENOENT") console.error(`No file '${fileToWatch}' found`);
    else console.error(e)
}    
