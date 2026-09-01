const { execSync } = require('child_process');

try {
  if (process.env.OPENNEXT_IS_BUILDING === '1') {
    process.exit(0);
  }

  // Vercel sets VERCEL=1. If we are not on Vercel, assume Cloudflare/Local and build for OpenNext.
  if (!process.env.VERCEL) {
    console.log('☁️ Not on Vercel. Running OpenNext build for Cloudflare...');
    execSync('npx -y -p wrangler@latest -p @opennextjs/cloudflare@latest opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion', { 
      stdio: 'inherit',
      env: { ...process.env, OPENNEXT_IS_BUILDING: '1' }
    });
  } else {
    console.log('✅ Vercel environment detected. Skipping OpenNext build.');
  }
} catch (error) {
  console.error('❌ Error during build:', error);
  process.exit(1);
}
