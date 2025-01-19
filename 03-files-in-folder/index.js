const fs = require('fs');
const path = require('path');

const { stdout } = process;

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    const filesArr = files.filter((item) => item.isFile());

    for (const file of filesArr) {
      const fileFullName = file.name;
      const filePath = path.join(folderPath, file.name);
      const fileExtension = path.extname(filePath).slice(1);
      const fileName = fileFullName.replace(`.${fileExtension}`, '');

      fs.stat(filePath, (err, stats) => {
        const fileSize = `${(stats.size / 1024).toFixed(3)}kb`;
        const resultText = `${fileName}-${fileExtension}-${fileSize}`;

        stdout.write(`${resultText}\n`);
      });
    }
  }
});
