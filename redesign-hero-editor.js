const fs = require('fs');
let file = 'src/components/admin/PageHeroEditor.tsx';
let code = fs.readFileSync(file, 'utf8');

const newRenderHTML = `          ) : (
            <div className="space-y-5 mt-2">
              {fields.map((f) => (
                <div key={f.key} className="p-5 rounded-xl border border-border/60 bg-gradient-to-br from-card to-muted/20 shadow-sm transition-all focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/5">
                  <div className="mb-3">
                    <Label className="text-base font-bold text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/80" />
                      {f.label}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1 ml-3.5 border-l-2 border-muted pl-2">{f.description}</p>
                  </div>
                  <div className="ml-3.5">
                    {f.type === "textarea" ? (
                      <Textarea
                        rows={3}
                        value={values[f.key] ?? ""}
                        onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                        className="resize-none bg-background/50 border-border/60 focus:bg-background transition-colors"
                      />
                    ) : (
                      <Input
                        value={values[f.key] ?? ""}
                        onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                        className="bg-background/50 border-border/60 focus:bg-background transition-colors"
                      />
                    )}
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4 border-t border-border/40 mt-6">
                <Button 
                  onClick={() => saveMutation.mutate()} 
                  disabled={saveMutation.isPending}
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/25 rounded-full px-8"
                >
                  {saveMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Hero Section
                </Button>
              </div>
            </div>
          )}`;

const startIdx = code.indexOf('          ) : (');
const endIdx = code.indexOf('          )}', startIdx) + 12;

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + newRenderHTML + code.substring(endIdx);
  fs.writeFileSync(file, code);
  console.log("PageHeroEditor redesigned!");
} else {
  console.log("Could not find the bounds for PageHeroEditor.");
}
