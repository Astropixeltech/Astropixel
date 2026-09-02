const fs = require('fs');
let file = 'src/views/AdminDashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace window.location.reload() in the sync hook
code = code.replace(/if \(typeof window !== 'undefined'\) window\.location\.reload\(\);/g, 'if (typeof refreshProfile !== "undefined") refreshProfile();');

fs.writeFileSync(file, code);
console.log("Fixed auto-sync reload!");
