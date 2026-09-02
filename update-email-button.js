const fs = require('fs');
let file = 'src/components/admin/EmailManagement.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace the old cyan gradient with the new brand gradient
code = code.replace(
  "'bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700'",
  "'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-primary/20'"
);

fs.writeFileSync(file, code);
console.log("Updated button colors in EmailManagement!");
