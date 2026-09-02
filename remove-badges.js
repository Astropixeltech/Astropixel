const fs = require('fs');
let file = 'src/components/admin/WorksManagement.tsx';
let code = fs.readFileSync(file, 'utf8');

const regex = /\{\/\* Bottom Badges on Image \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*\{\/\* Content Section \*\/\}/m;
code = code.replace(regex, '</div>\n\n            {/* Content Section */}');

fs.writeFileSync(file, code);
console.log("Removed bottom badges from image overlay!");
