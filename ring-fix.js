const fs = require('fs');

let btn = fs.readFileSync('src/components/ui/button.tsx', 'utf8');

btn = btn.replace(
  'border border-purple-300/60 dark:border-purple-700/50',
  'ring-1 ring-inset ring-purple-300/60 dark:ring-purple-700/50 border-0'
);

fs.writeFileSync('src/components/ui/button.tsx', btn);

console.log("Changed border to ring-inset to fix corner clipping!");
