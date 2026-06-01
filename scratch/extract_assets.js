const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'htmls', 'vishwa-final.html');
const assetsDir = path.join(__dirname, '..', 'src', 'assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

console.log('Reading HTML file...');
const html = fs.readFileSync(htmlPath, 'utf8');

// 1. Extract .img-human base64
console.log('Extracting human image...');
const humanMatch = html.match(/class="img-human"\s+src="data:image\/png;base64,([^"]+)"/);
if (humanMatch) {
  const buffer = Buffer.from(humanMatch[1], 'base64');
  fs.writeFileSync(path.join(assetsDir, 'human.png'), buffer);
  console.log('Saved human.png');
} else {
  console.log('Failed to match human image');
}

// 2. Extract .img-char base64
console.log('Extracting char image...');
const charMatch = html.match(/class="img-char"\s+src="data:image\/png;base64,([^"]+)"/);
if (charMatch) {
  const buffer = Buffer.from(charMatch[1], 'base64');
  fs.writeFileSync(path.join(assetsDir, 'char.png'), buffer);
  console.log('Saved char.png');
} else {
  console.log('Failed to match char image');
}

console.log('Asset extraction complete.');
