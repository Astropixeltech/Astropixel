const fs = require('fs');

let btn = fs.readFileSync('src/components/ui/button.tsx', 'utf8');

// Revert rounded-full to rounded-lg
btn = btn.replace(/rounded-full/g, 'rounded-lg');
btn = btn.replace(/rounded-md/g, 'rounded-lg'); // ensure all are rounded-lg

fs.writeFileSync('src/components/ui/button.tsx', btn);

console.log("Buttons reverted to rounded-lg!");
