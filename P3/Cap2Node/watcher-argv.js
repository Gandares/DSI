const fs = require('fs');
const filename = process.argv[2];
const spawn = require('child_process').spawn;

if(!fs.existsSync(filename)) {
    console.error('No existe el archivo o directorio');
    const touch = spawn('touch', [filename]);
    console.log('Se ha creado el archivo...')
}

fs.watch(filename, () => {
    if(fs.existsSync(filename)) {
        console.log(`File ​${filename}​ changed!`);
    }else{
        console.error('El fichero fue borrado');
        process.exit(1);
    }
});
console.log(`Now watching ​${filename}​ for changes...`);