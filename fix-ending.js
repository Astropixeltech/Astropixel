const fs = require('fs');
let file = 'src/components/admin/PageHeroEditor.tsx';
let code = fs.readFileSync(file, 'utf8');

const correctEnding = `              <div className="flex justify-end pt-4 border-t border-border/40 mt-6">
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
          )}
        </CardContent>
      )}
    </Card>
  );
}
`;

// Slice it correctly
const splitPoint = code.indexOf('              <div className="flex justify-end pt-4 border-t border-border/40 mt-6">');
if (splitPoint !== -1) {
  code = code.substring(0, splitPoint) + correctEnding;
  fs.writeFileSync(file, code);
  console.log("Fixed ending!");
} else {
  console.log("Could not find split point");
}
