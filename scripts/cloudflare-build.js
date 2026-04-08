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
    if (item === '.build') continue; // Skip build cache if possible

    const srcPath = path.join(sourceDir, item);
    const destPath = path.join(targetDir, item === 'worker.js' ? '_worker.js' : item);

    try {
        if (fs.existsSync(destPath)) {
            // Remove existing to avoid conflict if it's a directory
            if (fs.lstatSync(destPath).isDirectory()) {
                fs.rmSync(destPath, { recursive: true, force: true });
            } else {
                fs.unlinkSync(destPath);
            }
        }
        fs.renameSync(srcPath, destPath);
        console.log(`  - Moved ${item} -> ${path.basename(destPath)}`);
    } catch (err) {
        console.warn(`  ⚠️ Could not move ${item}: ${err.message}`);
    }
}

console.log('📝 Step 3: Generating _routes.json...');
const routesConfig = {
    version: 1,
    include: ["/*"],
    exclude: [
        "/_next/static/*",
        "/favicon.ico",
        "/assets/*",
        "/*.svg",
        "/*.png",
        "/*.jpg",
        "/*.ico"
    ]
};

fs.writeFileSync(
    path.join(targetDir, '_routes.json'),
    JSON.stringify(routesConfig, null, 2)
);
console.log('  - Created _routes.json with asset exclusions');

console.log('\n✅ Deployment structure ready at .open-next/assets');
