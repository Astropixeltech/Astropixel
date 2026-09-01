const { execSync } = require('child_process');

try {
  if (process.env.OPENNEXT_IS_BUILDING === '1') {
    process.exit(0);
  }

  if (process.env.CF_PAGES === '1' || process.env.CF_PAGES === 'true' || process.env.CF_PAGES_BRANCH || process.env.CF_PAGES_URL) {
    console.log('☁️ Detected Cloudflare Pages environment. Running OpenNext build...');
    execSync('npx -y -p wrangler@latest -p @opennextjs/cloudflare@latest opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion', { 
      stdio: 'inherit',
      env: { ...process.env, OPENNEXT_IS_BUILDING: '1' }
    });
  } else {
    console.log('✅ Not in Cloudflare Pages environment (likely Vercel or Local). Skipping OpenNext build.');
  }
} catch (error) {
  console.error('❌ Error during build:', error);
  process.exit(1);
}
