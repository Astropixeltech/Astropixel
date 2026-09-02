const fs = require('fs');
let file = 'src/views/AdminDashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

const newSidebarSettings = `            {/* Settings Dropdown */}
            <div className="mb-2">
              <button
                onClick={() => setExpandedGroups(prev => ({ ...prev, settings: !prev.settings }))}
                className="w-full flex items-center justify-between gap-2.5 px-2.5 md:px-3 py-2 md:py-2 rounded-xl text-sm font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden md:inline truncate">{language === 'bn' ? 'সেটিংস' : 'Settings'}</span>
                </div>
                <ChevronRight className={\`w-3 h-3 transition-transform \${expandedGroups.settings ? 'rotate-90' : ''}\`} />
              </button>
              
              {expandedGroups.settings && (
                <div className="mt-1 ml-2 pl-3 border-l border-border/50 space-y-0.5">
                  {renderNavButton({ id: 'sitesettings', icon: Settings, label: 'Site Settings' } as any, 'from-slate-500 to-slate-700')}
                  {renderNavButton({ id: 'profile', icon: User, label: 'Users' } as any, 'from-slate-500 to-slate-700')}
                  {renderNavButton({ id: 'email', icon: Send, label: 'Email' } as any, 'from-slate-500 to-slate-700')}
                </div>
              )}
            </div>`;

const startStr = "{/* Settings - single entry, opens Settings hub */}";
const endStr = "</nav>";

const startIdx = code.indexOf(startStr);
const endIdx = code.indexOf(endStr, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + newSidebarSettings + "\n          " + code.substring(endIdx);
  fs.writeFileSync(file, code);
  console.log("Updated settings menu to dropdown manually!");
} else {
  console.log("Bounds not found.");
}
