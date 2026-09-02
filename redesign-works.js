const fs = require('fs');
let file = 'src/components/admin/WorksManagement.tsx';
let code = fs.readFileSync(file, 'utf8');

const newWorksCard = `        {worksList.map((work) => (
          <Card key={work.id} className={\`overflow-hidden flex flex-col hover:shadow-md transition-all duration-200 border-border/50 \${!work.is_published ? "opacity-60 grayscale-[0.2]" : ""}\`}>
            {/* Top Image Section */}
            <div className="relative aspect-[16/10] bg-muted w-full overflow-hidden group">
              {work.image_url ? (
                <img
                  src={work.image_url}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="w-10 h-10 text-muted-foreground/30" />
                </div>
              )}
              
              {/* Floating Badges & Actions Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none opacity-80" />
              
              {/* Top Actions (Edit/Delete) */}
              <div className="absolute top-3 right-3 flex gap-1 z-10 bg-black/20 backdrop-blur-md rounded-lg p-1 shadow-sm border border-white/10 pointer-events-auto">
                <Button variant="ghost" size="icon" className="w-7 h-7 text-white hover:bg-white/20 hover:text-white" onClick={() => handleEdit(work)}>
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="w-7 h-7 text-white hover:bg-white/20 hover:text-red-400" onClick={() => handleDelete(work.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Bottom Badges on Image */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end z-10">
                <span className="px-2.5 py-1 bg-white/95 text-foreground text-xs font-bold rounded shadow-sm uppercase tracking-widest">
                  {work.category}
                </span>
                
                <div className="flex gap-1.5">
                  {work.is_featured && (
                    <span className="px-2 py-1 bg-amber-500/90 backdrop-blur text-white text-[10px] font-bold uppercase rounded shadow-sm">
                      Featured
                    </span>
                  )}
                  {!work.is_published && (
                    <span className="px-2 py-1 bg-red-500/90 backdrop-blur text-white text-[10px] font-bold uppercase rounded shadow-sm">
                      Draft
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <CardContent className="p-5 flex-grow flex flex-col">
              <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2 text-card-foreground group-hover:text-primary transition-colors">
                {work.title}
              </h3>
              
              {work.description && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
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
  console.log("Works cards redesigned successfully!");
} else {
  console.log("Could not find the bounds for works cards.");
}
