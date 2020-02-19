'use strict'
const program = require('commander');
const fs = require('fs');
const async = require('async');

function collect(value, previous) {
  return previous.concat([value]);
}

program
    .option('-f, --collect <value>', 'repeatable collect file', collect, [])
    .option('-o, --salida <value>', 'output file', 'out.txt')

program.parse(process.argv);

const salida = program.salida;

program.collect.forEach(element => {
    if(!fs.statSync(element).isFile()){
        throw Error('A file must be specified!');
    }
});

async.map(program.collect, fs.readFile,  function(err, results)  {
    if (err) {
        throw err;
    }
    let cadena = '';
    results.forEach(element => {
        cadena += element.toString();
    });
    fs.writeFile(salida, cadena, (err) => {
        if (err) {
            throw err;
        }
    });
});