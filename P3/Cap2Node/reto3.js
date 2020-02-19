'use strict';
const spawn = require('child_process').spawn;

const comando = spawn(process.argv[2]);
comando.stdout.pipe(process.stdout);