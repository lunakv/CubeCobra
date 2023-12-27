const fs = require('fs');

fs.mkdirSync('model/', { recursive: true });

const files = ['model/elos.json', 'model/indexToOracleMap.json'];
for (let file of files) {
  try {
    fs.writeFileSync(file, '[]', { flag: 'wx' });
  catch (e) {
    if (e.code === 'EEXIST') {
      console.log(`File ${file} already exists, skipping.`);
    } else {
      throw e;
    }
  }
}
