const fs = require('fs');
const path = require('path');

try {
  const stylesPath = path.join(__dirname, 'styles');
  const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

  let styleArr = [];

  fs.readdir(stylesPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    }

    const cssFiles = files.filter(
      (file) => file.isFile() && file.name.slice(-4) === '.css',
    );

    cssFiles.forEach((file) => {
      const cssFilePath = path.join(stylesPath, file.name);

      fs.readFile(cssFilePath, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          styleArr.push(data.toString());
        }

        fs.writeFile(bundlePath, styleArr.join('\n\n'), (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    });
  });
} catch(err) {}
