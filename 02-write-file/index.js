const fs = require('fs');
const path = require('path');
const readline = require('readline');

const { stdin, stdout } = process;

const newFilePath = path.join(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(newFilePath);

const rl = readline.createInterface(stdin, stdout);

rl.setPrompt('Please type any text below and then press "Enter":' + '\n');
rl.prompt();

rl.on('line', (line) => {
  if (line === 'exit') {
    rl.close();
  } else {
    writeStream.write(line + '\n');
  }
});

process.on('exit', () => stdout.write('Ok, goodbye!' + '\n'));
