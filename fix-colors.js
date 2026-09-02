const fs = require('fs');

// 1. Update globals.css (index.css)
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace cyan variables
css = css.replace(/--primary:\s*185 100% 38%/g, '--primary: 221 83% 53%');
css = css.replace(/--accent:\s*185 100% 38%/g, '--accent: 271 91% 65%');
css = css.replace(/--ring:\s*185 100% 38%/g, '--ring: 221 83% 53%');
css = css.replace(/--gradient-start:\s*185 100% 38%/g, '--gradient-start: 221 83% 53%');
css = css.replace(/--gradient-mid:\s*195 100% 42%/g, '--gradient-mid: 271 91% 65%');
css = css.replace(/--gradient-end:\s*215 100% 52%/g, '--gradient-end: 280 80% 90%'); // light white-purple

// .dark replacements
css = css.replace(/--primary:\s*185 100% 45%/g, '--primary: 221 83% 60%');
css = css.replace(/--accent:\s*185 100% 45%/g, '--accent: 271 91% 65%');
css = css.replace(/--ring:\s*185 100% 45%/g, '--ring: 221 83% 60%');
css = css.replace(/--gradient-start:\s*185 100% 45%/g, '--gradient-start: 221 83% 60%');
css = css.replace(/--gradient-mid:\s*195 100% 50%/g, '--gradient-mid: 271 91% 65%');
css = css.replace(/--gradient-end:\s*215 100% 60%/g, '--gradient-end: 280 80% 90%');

// .button04 gradient fix (replace cyan/blue hardcoded gradients)
css = css.replace(/background: linear-gradient\(135deg, #06b6d4 0%, #0284c7 50%, #2563eb 100%\);/g, 'background: linear-gradient(135deg, #2563eb 0%, #9333ea 70%, #f3e8ff 100%);');
css = css.replace(/rgba\(6, 182, 212/g, 'rgba(147, 51, 234'); // replace cyan shadow with purple shadow
css = css.replace(/#0891b2/g, '#1d4ed8');
css = css.replace(/#0369a1/g, '#7e22ce');

fs.writeFileSync('src/index.css', css);

// 2. Update button.tsx
let btn = fs.readFileSync('src/components/ui/button.tsx', 'utf8');
// replace default variant
btn = btn.replace(
  'default: "bg-primary text-primary-foreground hover:bg-primary/90",',
  'default: "bg-gradient-to-r from-blue-600 via-purple-600 to-purple-100 text-white hover:opacity-90 shadow-md", // Blue to Purple to Light White'
);
fs.writeFileSync('src/components/ui/button.tsx', btn);

console.log("Colors updated!");
