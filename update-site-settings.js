const fs = require('fs');
let file = 'src/components/admin/SiteSettingsManagement.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Shim the SEO fields in queryFn
const queryFnStr = `    queryFn: async () => {
      // Fetch settings for current scope. Fallback to agency template for missing keys on learn scope.
      const { data: scopeRows, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('site_scope', scope)
        .order('setting_key');
      if (error) throw error;

      let allRows = scopeRows || [];

      // Ensure SEO/Branding keys always exist for agency
      if (scope === 'agency') {
        const requiredAgencyKeys = [
          { key: 'site_name', type: 'text' },
          { key: 'favicon_url', type: 'image' },
          { key: 'logo_url', type: 'image' },
          { key: 'meta_title', type: 'text' },
          { key: 'meta_description', type: 'text' },
          { key: 'og_image_url', type: 'image' },
        ];
        const existingKeys = new Set(allRows.map((r: any) => r.setting_key));
        const shims = requiredAgencyKeys.filter(rk => !existingKeys.has(rk.key)).map(rk => ({
          id: \`shim-\${rk.key}\`,
          setting_key: rk.key,
          setting_value: '',
          setting_type: rk.type,
          site_scope: 'agency'
        }));
        allRows = [...allRows, ...shims];
      }

      if (scope === 'learn') {
        // Ensure the same keys as agency are visible for editing (so admin can create learn overrides)
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

code = code.replace(/queryFn: async \(\) => \{[\s\S]*?return scopeRows as SiteSetting\[\];\s*\}/, queryFnStr);

// 2. Add labels and descriptions
const labelsObj = `      const labels: Record<string, string> = {
      'favicon_url': 'Favicon URL',
      'logo_url': 'Logo URL',
      'site_name': 'Site Name',
      'meta_title': 'Meta Title',
      'meta_description': 'Meta Description',
      'og_image_url': 'Social Share Image (OG)',
      'bkash_number': 'Bkash Number',
      'nagad_number': 'Nagad Number',
      'bkash_enabled': 'Bkash Payment',
      'nagad_enabled': 'Nagad Payment',
    };`;

code = code.replace(/const labels: Record<string, string> = \{[\s\S]*?\};/, labelsObj);

const descObj = `      const descriptions: Record<string, string> = {
      'favicon_url': 'Small icon shown on browser tab (URL)',
      'logo_url': 'Site main logo (URL)',
      'site_name': 'Global Site Name',
      'meta_title': 'Default SEO Title for search engines',
      'meta_description': 'Default SEO Description',
      'og_image_url': 'Image shown when link is shared on Facebook/Twitter',
      'bkash_number': 'Bkash number for course payments',
      'nagad_number': 'Nagad number for course payments',
      'bkash_enabled': 'Toggle Bkash manual payment option',
      'nagad_enabled': 'Toggle Nagad manual payment option',
    };`;

code = code.replace(/const descriptions: Record<string, string> = \{[\s\S]*?\};/, descObj);

fs.writeFileSync(file, code);
console.log("Updated SiteSettingsManagement!");
