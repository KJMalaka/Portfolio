const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './images';
const outputDir = './images';

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.jpeg' || path.extname(file).toLowerCase() === '.png') {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, path.parse(file).name + '.webp');

      sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath)
        .then(() => {
          console.log(`Converted ${file} to ${path.parse(file).name}.webp`);
        })
        .catch(err => {
          console.error('Error converting image:', err);
        });
    }
  });
});
