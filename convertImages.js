const fs = require('fs');
const path = require('path');
const webp = require('webp-converter');

function convertImages(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const ext = path.extname(filePath);

    if (ext === '.jpg' || ext === '.png') {
      const webpFilePath = filePath.replace(ext, '.webp');
      webp.cwebp(filePath, webpFilePath, '-q 80', logging='-v')
        .then(() => console.log(`Converted ${filePath} to ${webpFilePath}`))
        .catch(error => console.error(`Error converting ${filePath}: ${error.message}`));
    } else if (fs.statSync(filePath).isDirectory()) {
      // If the current item is a directory, recurse into it
      convertImages(filePath);
    }
  });
}

// Assuming your 'public' directory is at the root of your project
convertImages(__dirname + '/public'); // Adjust the path as necessary
