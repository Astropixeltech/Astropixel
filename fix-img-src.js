const fs = require('fs');
let file = 'src/views/AdminDashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/src=\{\(profile as any\)\?\.avatar_url \|\| user\?\.photoURL \|\| ""\}/g, 'src={localAvatar || (profile as any)?.avatar_url || user?.photoURL || ""}');

fs.writeFileSync(file, code);
console.log("Fixed img src!");
