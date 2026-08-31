import fs from 'fs';
import path from 'path';

function findFiles(dir, matchExt, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, matchExt, fileList);
    } else if (matchExt.some(ext => file.endsWith(ext))) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const appDir = path.resolve('src/app');
const tsxFiles = findFiles(appDir, ['.tsx', '.ts']);

console.log('=== METADATA DEFINITIONS IN SRC/APP ===');
for (const f of tsxFiles) {
  const code = fs.readFileSync(f, 'utf8');
  if (code.includes('metadata') || code.includes('generateMetadata')) {
    const rel = path.relative(appDir, f);
    console.log(`\nFile: src/app/${rel}`);
    const lines = code.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('title:') || line.includes('description:') || line.includes('metadata') || line.includes('generateMetadata')) {
        console.log(`  L${idx + 1}: ${line.trim()}`);
      }
    });
  }
}
