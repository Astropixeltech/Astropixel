const fs = require('fs');
let file = 'src/components/admin/WorksManagement.tsx';
let code = fs.readFileSync(file, 'utf8');

const badgesHTML = `
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                  {work.category}
                </span>
                {work.is_featured && (
                  <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-600 text-[10px] font-bold uppercase rounded">
                    Featured
                  </span>
                )}
                {!work.is_published && (
                  <span className="px-1.5 py-0.5 bg-red-500/10 text-red-600 text-[10px] font-bold uppercase rounded">
                    Draft
                  </span>
                )}
              </div>
`;

// Insert it right after <CardContent ...> and before <h3>
code = code.replace(
  /<CardContent className="p-5 flex-grow flex flex-col">\s*<h3/m,
  '<CardContent className="p-5 flex-grow flex flex-col">' + badgesHTML + '              <h3'
);

fs.writeFileSync(file, code);
console.log("Restored badges in CardContent!");
