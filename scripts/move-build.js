const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'dist-temp', 'browser');
const rootDir = path.join(__dirname, '..');

// Check if source directory exists
if (!fs.existsSync(sourceDir)) {
  console.error('Build directory not found:', sourceDir);
  process.exit(1);
}

// Get all files from the build directory
function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy all files from dist-temp/browser to root
console.log('Moving build files to root directory...');
copyRecursive(sourceDir, rootDir);

// Remove the temp directory
console.log('Cleaning up temporary build directory...');
fs.rmSync(path.join(__dirname, '..', 'dist-temp'), { recursive: true, force: true });

console.log('Build files moved to root directory successfully!');
