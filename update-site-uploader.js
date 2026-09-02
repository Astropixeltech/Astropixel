const fs = require('fs');
let file = 'src/components/admin/SiteSettingsManagement.tsx';
let code = fs.readFileSync(file, 'utf8');

// Add ImageUploader and Textarea imports
if (!code.includes("ImageUploader")) {
  code = code.replace(
    'import { Switch } from "@/components/ui/switch";',
    'import { Switch } from "@/components/ui/switch";\nimport { Textarea } from "@/components/ui/textarea";\nimport ImageUploader from "./ImageUploader";'
  );
}

// Update the shims to have default values and textarea for meta_description
const queryFnRegex = /queryFn: async \(\) => \{[\s\S]*?return allRows as SiteSetting\[\];\s*\}/;
const newQueryFn = `queryFn: async () => {
      const { data: scopeRows, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('site_scope', scope)
        .order('setting_key');
      if (error) throw error;

      let allRows = scopeRows || [];

      if (scope === 'agency') {
        const requiredAgencyKeys = [
          { key: 'site_name', type: 'text', val: 'AstroPixel' },
          { key: 'favicon_url', type: 'image', val: '/astropixel-icon.png' },
          { key: 'logo_url', type: 'image', val: '/astropixel-logo-full.png' },
          { key: 'meta_title', type: 'text', val: 'AstroPixel - UI/UX, Branding & Web Development Agency' },
          { key: 'meta_description', type: 'textarea', val: 'AstroPixel is a Bangladesh-based international digital agency specializing in UI/UX design, logo & branding, web development, SaaS development, DevOps, and digital marketing for clients worldwide.' },
          { key: 'og_image_url', type: 'image', val: 'https://res.cloudinary.com/dzuex7n2u/image/upload/v1779254926/astropixel/site/og-image.png' },
        ];
        const existingKeys = new Set(allRows.map((r: any) => r.setting_key));
        const shims = requiredAgencyKeys.filter(rk => !existingKeys.has(rk.key)).map(rk => ({
          id: \`shim-\${rk.key}\`,
          setting_key: rk.key,
          setting_value: rk.val,
          setting_type: rk.type,
          site_scope: 'agency'
        }));
        allRows = [...allRows, ...shims];
      }

      if (scope === 'learn') {
        const { data: agencyRows } = await (supabase as any)
          .from('site_settings')
          .select('*')
          .eq('site_scope', 'agency')
          .order('setting_key');
        const learnKeys = new Set(allRows.map((r: any) => r.setting_key));
        const shims = (agencyRows || [])
          .filter((r: any) => !learnKeys.has(r.setting_key))
          .map((r: any) => ({ ...r, id: \`shim-\${r.setting_key}\`, setting_value: '', site_scope: 'learn' }));
        return [...allRows, ...shims] as SiteSetting[];
      }

      return allRows as SiteSetting[];
    }`;
code = code.replace(queryFnRegex, newQueryFn);

// Update CardContent
const cardContentRegex = /<CardContent className="space-y-3">[\s\S]*?(?=<\/CardContent>\s*<\/Card>)/;
const newCardContent = `<CardContent className="space-y-4 pt-4">
                  {setting.setting_type === 'image' ? (
                    <div className="space-y-3">
                      <ImageUploader 
                        value={currentValue} 
                        onChange={(url) => {
                          handleChange(setting.setting_key, url);
                        }} 
                        folder="site-settings"
                      />
                      <Button 
                        className="w-full"
                        onClick={() => handleSave(setting.setting_key, setting.setting_type)}
                        disabled={!hasChanges || updateMutation.isPending}
                        variant={hasChanges ? "default" : "secondary"}
                      >
                        {updateMutation.isPending && hasChanges ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Label htmlFor={setting.setting_key} className="text-muted-foreground text-xs uppercase tracking-wider">
                        Value
                      </Label>
                      {setting.setting_type === 'textarea' ? (
                        <Textarea
                          id={setting.setting_key}
                          value={currentValue}
                          onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                          placeholder="Enter text..."
                          rows={4}
                          className="resize-none"
                        />
                      ) : (
                        <Input
                          id={setting.setting_key}
                          value={currentValue}
                          onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                          placeholder="Enter value"
                        />
                      )}
                      <Button 
                        className="w-full"
                        onClick={() => handleSave(setting.setting_key, setting.setting_type)}
                        disabled={!hasChanges || updateMutation.isPending}
                        variant={hasChanges ? "default" : "secondary"}
                      >
                        {updateMutation.isPending && hasChanges ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Setting
                      </Button>
                    </div>
                  )}
                `;
code = code.replace(cardContentRegex, newCardContent);

fs.writeFileSync(file, code);
console.log("Updated UI for image uploads and defaults!");
