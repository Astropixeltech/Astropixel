const fs = require('fs');
let file = 'src/components/admin/WorkHeroEditor.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/title="Work Page[^"]*Hero Section"/, 'title="Work Page - Hero Section"');
code = code.replace(/label: "dY"- Top Badge"/, 'label: "Top Badge"');
code = code.replace(/label: "dY'[^\s]* Hero Title"/, 'label: "Hero Title"');
code = code.replace(/description: "Wrap highlighted words with \| \| [^"]*e\.g\. Our Creative \|Works & Projects\|"/, 'description: "Wrap highlighted words with | | - e.g. Our Creative |Works & Projects|"');
code = code.replace(/label: "dY"\? Description"/, 'label: "Description"');
code = code.replace(/label: "dY\?[^"]*Bottom Chip"/, 'label: "Bottom Chip"');
code = code.replace(/fallback: "Projects [^]* Graphic Design [^]* Web [^]* Video"/g, 'fallback: "Projects • Graphic Design • Web • Video"');
code = code.replace(/description: "Text after the project count \(e\.g\. Projects [^]* Graphic Design [^]* Web [^]* Video\)"/, 'description: "Text after the project count (e.g. Projects • Graphic Design • Web • Video)"');

fs.writeFileSync(file, code);
console.log("Fixed WorkHeroEditor strings!");
