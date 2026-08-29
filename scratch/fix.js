const fs = require('fs');
let code = fs.readFileSync('src/views/AdminDashboard.tsx', 'utf8');
code = code.replace(/<div className="space-y-2">\s*<Label htmlFor="admin-password">[\s\S]*?<\/div>/, '');
fs.writeFileSync('src/views/AdminDashboard.tsx', code);
