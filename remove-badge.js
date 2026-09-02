const fs = require('fs');
let file = 'src/views/AdminDashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

// Find the Badge line next to the Welcome heading
const badgeRegex = /<Badge variant="secondary" className="text-\[10px\] uppercase tracking-wider">[\s\S]*?<\/Badge>/;
code = code.replace(badgeRegex, '');

fs.writeFileSync(file, code);
console.log("Removed AGENCY SITE badge!");
