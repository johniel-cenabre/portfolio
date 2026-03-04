const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'dist-temp', 'browser');
const rootDir = path.join(__dirname, '..');

// Check if source directory exists
if (!fs.existsSync(sourceDir)) {
  console.error('Build directory not found:', sourceDir);
  process.exit(1);
}

// Function to remove old build files
function removeOldBuildFiles() {
  console.log('Removing old build files...');
  
  const files = fs.readdirSync(rootDir);
  const patternsToRemove = [
    /^main-.*\.js$/,
    /^styles-.*\.css$/,
    /^polyfills-.*\.js$/
  ];
  
  let removedCount = 0;
  files.forEach(file => {
    const filePath = path.join(rootDir, file);
    const stats = fs.statSync(filePath);
    
    // Only process files (not directories)
    if (stats.isFile()) {
      // Check if file matches any pattern
      const shouldRemove = patternsToRemove.some(pattern => pattern.test(file));
      
      if (shouldRemove) {
        try {
          fs.unlinkSync(filePath);
          console.log(`  Removed: ${file}`);
          removedCount++;
        } catch (error) {
          console.error(`  Error removing ${file}:`, error.message);
        }
      }
    }
  });
  
  console.log(`Removed ${removedCount} old build file(s).`);
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

// Remove old build files first
removeOldBuildFiles();

// Copy all files from dist-temp/browser to root
console.log('Moving build files to root directory...');
copyRecursive(sourceDir, rootDir);

// Remove the temp directory
console.log('Cleaning up temporary build directory...');
fs.rmSync(path.join(__dirname, '..', 'dist-temp'), { recursive: true, force: true });

console.log('Build files moved to root directory successfully!');
