'use strict';
const spawn = require('child_process').spawn;
var orden = process.argv[2];
var parametros = process.argv.slice(3);

const comando = spawn(orden,parametros);
comando.stdout.pipe(process.stdout);