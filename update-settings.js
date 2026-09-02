const fs = require('fs');
let file = 'src/views/AdminDashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Replace the Sidebar Settings with a Dropdown
const oldSettingsSidebar = `            {/* Settings - single entry, opens Settings hub */}
            <div>
              {renderNavButton(
                { id: 'settings', icon: Settings, label: language === 'bn' ? 'AAA,AA,A,AAA,A A,AAAA,AA.A,AAA,AA,AAAA,AA,AAA,AA,A,' : 'Settings' } as any,
                'from-amber-500 to-orange-500'
              )}
            </div>`;

// Wait, the bangladesh text might be encoded differently in the actual source code.
// I should use regex to replace it.
const sidebarSettingsRegex = /\s*\{\/\* Settings - single entry[^\}]*?id: 'settings'[^\}]*?\}\s*as any,[^\}]*?\)\}\s*<\/div>/m;

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

code = code.replace(sidebarSettingsRegex, '\n' + newSidebarSettings);


// 2. Remove the TabsContent for Settings Hub
const settingsHubRegex = /\{\/\* Settings Hub \*\/\}[\s\S]*?(?=\{\/\* Site Settings \(general\) \*\/\}|\{\/\* Site Settings)/;
code = code.replace(settingsHubRegex, '');


// 3. Remove back buttons from SiteSettings, PaymentMethod, Email, etc.
// But we actually want to REMOVE completely: PaymentMethod, API Keys, Analytics, Feedback, Comments, Coupons.
const paymentRegex = /\{\/\* Payment Method[\s\S]*?<\/TabsContent>/;
const apiKeysRegex = /\{\/\* API Keys Tab \*\/\}[\s\S]*?<\/TabsContent>/;
const landingRegex = /<TabsContent value="landing"[\s\S]*?<\/TabsContent>/;
// Wait, the user said "বাদবাকি যা আছে রিমুভ করে দাও" (Remove whatever else is there). I'll just keep the 3 they wanted in the main Tabs structure, plus the LMS/CMS ones.
// Let's just remove the Back buttons from `sitesettings`, `profile` and `email` since they are no longer sub-pages of a Hub.

code = code.replace(/<Button variant="ghost" size="sm" onClick=\{[^}]*setActiveTab\('settings'\)[^}]*\}[\s\S]*?<\/Button>/g, '');

fs.writeFileSync(file, code);
console.log("Updated settings menu to dropdown!");
