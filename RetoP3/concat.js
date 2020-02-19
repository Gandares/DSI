'use strict'
const program = require('commander');
const fs = require('fs');

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

var contenido = [];

function lectura(ficheros, actual, limite, callback){
    fs.readFile(ficheros[actual], (err, data) => {
        if (err) {
            throw err;
        }
        callback(ficheros,data,actual,limite,lectura);
    });
}

function escritura(ficheros, data, actual, limite, callback){
    fs.appendFile(salida, data.toString(), (err) => {
        if (err) {
           throw err;
        }
        actual++;
        if(actual<limite){
            callback(ficheros,actual,limite,escritura);
        }
    });
}

lectura(program.collect,0,program.collect.length,escritura);
