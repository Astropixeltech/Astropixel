const fs = require('fs');
let file = 'src/components/admin/EmailManagement.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  "className={`w-full h-14 text-base font-semibold rounded-xl transition-all duration-300 ${",
  "className={`w-full h-14 text-white text-base font-semibold rounded-xl transition-all duration-300 ${"
);

fs.writeFileSync(file, code);
console.log("Added text-white to button!");
