const ghpages = require('gh-pages');
const fs = require('fs-extra');
const path = require('path');

// Target output directory
const outDir = path.join(__dirname, '..', 'temp-publish');

// Clean and prepare temp publish directory
fs.removeSync(outDir);
fs.ensureDirSync(outDir);

// === COPY SECTIONS ===

// Copy React build directly (will go to root of GH Pages)
console.log('📦 Copying React app from /dist...');
fs.copySync(path.join(__dirname, '..', 'dist'), outDir);

// Copy JSDoc from /docs to /docs
console.log('📄 Copying JSDoc from /docs...');
fs.copySync(path.join(__dirname, '..', 'docs'), path.join(outDir, 'docs'));

// Copy coverage report from /coverage/lcov-report to /test-coverage
const coveragePath = path.join(__dirname, '..', 'coverage', 'lcov-report');
if (fs.existsSync(coveragePath)) {
    console.log('🧪 Copying coverage from /coverage/lcov-report...');
    fs.copySync(coveragePath, path.join(outDir, 'test-coverage'));
} else {
    console.warn('⚠️ Coverage not found, skipping...');
}

// === DEPLOY ===
console.log('🚀 Publishing everything to gh-pages...');
ghpages.publish(outDir, {
    branch: 'gh-pages',
    message: 'Deploy: app + docs + coverage in single branch',
    dotfiles: true,
    add: true,
}, (err) => {
    if (err) {
        console.error('❌ Deployment failed:', err);
        process.exit(1);
    } else {
        console.log('✅ Deployment successful: https://danielemasone.github.io/ingdanielemasone');
    }
});
