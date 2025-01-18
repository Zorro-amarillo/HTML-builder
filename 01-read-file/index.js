const fs = require('fs');
const path = require('path');

const { stdout } = process;

const textPath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(textPath);

readStream.on('data', (text) => {
  stdout.write(text);
});
