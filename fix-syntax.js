const fs = require('fs');
let file = 'src/components/admin/ServicesManagement.tsx';
let code = fs.readFileSync(file, 'utf8');

// The corrupted lines are roughly around PageHeroEditor
code = code.replace(/title="Services Page [^"]* Hero Section"/, 'title="Services Page - Hero Section"');
code = code.replace(/label: "dY"- Top Badge"/, 'label: "Top Badge"');
code = code.replace(/label: "o" Hero Title"/, 'label: "Hero Title"');
code = code.replace(/description: "Wrap highlighted words in \| \| \?" e\.g\. Crafted for \|Excellence\|"/, 'description: "Wrap highlighted words in | | e.g. Crafted for |Excellence|"');
code = code.replace(/label: "dY"\? Description"/, 'label: "Description"');

fs.writeFileSync(file, code);
console.log("Fixed syntax error!");
