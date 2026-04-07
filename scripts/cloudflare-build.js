const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Step 1: Building OpenNext Cloudflare Worker...');
execSync('npx @opennextjs/cloudflare@latest build', { stdio: 'inherit' });

console.log('📦 Step 2: Restructuring files for Cloudflare Pages advanced mode...');
const sourceDir = path.join(__dirname, '..', '.open-next');
const targetDir = path.join(sourceDir, 'assets');

// Files or directories to move into the assets folder
const items = fs.readdirSync(sourceDir);

for (const item of items) {
    // Do not try to move the assets folder inside itself
    if (item === 'assets') continue;

    const srcPath = path.join(sourceDir, item);

    if (item === 'worker.js') {
        // Rename worker.js to _worker.js which Pages expects
        fs.renameSync(srcPath, path.join(targetDir, '_worker.js'));
    } else {
        // Move dependencies (e.g. cloudflare, middleware, .build, etc)
        fs.renameSync(srcPath, path.join(targetDir, item));
    }
}

console.log('✅ Deployment structure completely ready at .open-next/assets');
