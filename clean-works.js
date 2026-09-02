const fs = require('fs');
let file = 'src/components/admin/WorksManagement.tsx';
let code = fs.readFileSync(file, 'utf8');

const newWorksCard = `        {worksList.map((work) => (
          <Card key={work.id} className={\`overflow-hidden flex flex-col hover:shadow-md transition-all duration-200 border-border/60 \${!work.is_published ? "opacity-60" : ""}\`}>
            {/* Top Image Section - Clean, no overlays */}
            <div className="relative aspect-[16/10] bg-muted w-full overflow-hidden border-b border-border/40">
              {work.image_url ? (
                <img
                  src={work.image_url}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="w-10 h-10 text-muted-foreground/30" />
                </div>
              )}
            </div>

            {/* Content Section */}
            <CardContent className="p-5 flex-grow flex flex-col">
              {/* Badges */}
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

              {/* Title and Actions */}
              <div className="flex justify-between items-start gap-3 mb-2">
                <h3 className="text-lg font-bold leading-tight line-clamp-2 text-foreground">
                  {work.title}
                </h3>
                <div className="flex gap-1 shrink-0 -mt-1 -mr-2">
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-primary" onClick={() => handleEdit(work)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(work.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Description */}
              {work.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                  {work.description}
                </p>
              )}
              
              {/* Footer */}
              <div className="mt-auto pt-4 border-t border-border/40 flex justify-between items-center">
                {work.project_url ? (
                  <a
                    href={work.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 flex items-center gap-1.5 text-sm font-semibold transition-colors"
                  >
                    View Live <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground italic">No link available</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}`;

const startIdx = code.indexOf('{worksList.map((work) => (');
const endIdx = code.indexOf('))}', startIdx) + 3;

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + newWorksCard + code.substring(endIdx);
  fs.writeFileSync(file, code);
  console.log("Works cards redesigned to be ultra clean!");
} else {
  console.log("Could not find the bounds for works cards.");
}
