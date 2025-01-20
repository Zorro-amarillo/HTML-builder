const fs = require('fs');
const path = require('path');

const copyDir = () => {
  const folderPath = path.join(__dirname, 'files');
  const copyFolderPath = `${folderPath}-copy`;

  const createFolder = () => {
    fs.mkdir(copyFolderPath, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  const copyFiles = () => {
    fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log(err);
      }
      files.forEach((file) => {
        const filePath = path.join(folderPath, file.name);
        const copyFilePath = path.join(copyFolderPath, file.name);

        fs.copyFile(filePath, copyFilePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    });
  };

  const deleteFiles = () => {
    fs.readdir(copyFolderPath, { withFileTypes: true }, (err, copies) => {
      copies.forEach((copy) => {
        const fileInFolder = path.join(folderPath, copy.name);
        const copyInFolder = path.join(copyFolderPath, copy.name);

        fs.access(fileInFolder, fs.constants.F_OK, (err) => {
          if (err) {
            fs.rm(copyInFolder, { force: true }, (err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        });
      });
    });
  };

  const copyFolder = async () => {
    await createFolder();
    await copyFiles();
    await deleteFiles();
  };

  copyFolder();
};

copyDir();
