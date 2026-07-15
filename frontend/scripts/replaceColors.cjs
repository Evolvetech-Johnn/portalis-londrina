const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Substituir indigo por gold
  content = content.replace(/\bindigo\b/g, 'gold');
  content = content.replace(/\bIndigo\b/g, 'Gold');
  
  // Substituir violet por amber (apoio)
  content = content.replace(/\bviolet\b/g, 'amber');
  content = content.replace(/\bViolet\b/g, 'Amber');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Updated:', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.html')) {
      // Ignorar libs e dependências, se houver
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('dist')) {
        replaceInFile(fullPath);
      }
    }
  }
}

// Rodar na pasta frontend/src, frontend/index.html e frontend/api
walkDir(path.join(__dirname, '..', 'src'));
walkDir(path.join(__dirname, '..', 'api'));
replaceInFile(path.join(__dirname, '..', 'index.html'));

console.log('Busca e substituição concluída.');
