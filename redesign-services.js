const fs = require('fs');
let file = 'src/components/admin/ServicesManagement.tsx';
let code = fs.readFileSync(file, 'utf8');

const newServiceCard = `        {servicesList.map((service) => (
          <Card key={service.id} className={\`overflow-hidden flex flex-col hover:shadow-md transition-all duration-200 border-border/60 \${!service.is_active ? "opacity-60 grayscale-[0.2]" : ""}\`}>
            {/* Top Image Section - Clean, no overlays */}
            {service.image_url && (
              <div className="relative aspect-[16/10] bg-muted w-full overflow-hidden border-b border-border/40 group">
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Content Section */}
            <CardContent className="p-5 flex-grow flex flex-col">
              {/* Title and Actions */}
              <div className="flex justify-between items-start gap-3 mb-1">
                <h3 className="text-xl font-bold leading-tight text-foreground">
                  {service.title}
                </h3>
                <div className="flex gap-1 shrink-0 -mt-1 -mr-2">
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-primary" onClick={() => handleEdit(service)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Subtitle */}
              {service.subtitle && (
                <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-3">
                  {service.subtitle}
                </p>
              )}

              {/* Description */}
              {service.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {service.description}
                </p>
              )}
              
              {/* Features List */}
              {service.features && service.features.length > 0 && (
                <div className="mt-auto pt-3 border-t border-border/40">
                  <p className="text-[11px] font-semibold text-foreground/60 uppercase tracking-widest mb-2">
                    Features ({service.features.length})
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    {service.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-[10px] text-primary font-bold pl-2.5">
                        + {service.features.length - 3} MORE
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {!service.is_active && (
                <div className="mt-4 pt-3 border-t border-border/40">
                  <span className="inline-block px-2 py-1 bg-red-500/10 text-red-600 rounded text-[10px] font-bold uppercase tracking-widest">
                    Inactive
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}`;

const startIdx = code.indexOf('{servicesList.map((service) => (');
const endIdx = code.indexOf('))}', startIdx) + 3;

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + newServiceCard + code.substring(endIdx);
  fs.writeFileSync(file, code);
  console.log("Services cards redesigned!");
} else {
  console.log("Could not find the bounds for services cards.");
}
