const fs = require('fs');
let code = fs.readFileSync('src/components/admin/ProjectBuilder.tsx', 'utf8');

// Add ImageUploader and Switch imports
code = code.replace(
  "import React, { useState } from 'react';",
  `import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';`
);

// Update initial state
code = code.replace(
  `const [workData, setWorkData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
  });`,
  `const [workData, setWorkData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'web',
    image_url: initialData?.image_url || '',
    live_url: initialData?.live_url || initialData?.project_url || '',
    is_featured: initialData?.is_featured ?? false,
    is_published: initialData?.is_published ?? true,
    tags: initialData?.tags || [],
  });`
);

// Add the UI fields in the "Project Settings" area
const settingsSection = `                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                  <select
                    value={workData.category}
                    onChange={(e) => setWorkData({ ...workData, category: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="web">Web Design & Development</option>
                    <option value="graphics">Graphic Design</option>
                    <option value="branding">Logo & Branding</option>
                    <option value="photography">Photography</option>
                    <option value="motion">Motion / 3D</option>
                  </select>
                </div>`;

const newSettingsSection = `                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                  <select
                    value={workData.category}
                    onChange={(e) => setWorkData({ ...workData, category: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="web">Web Design & Development</option>
                    <option value="graphics">Graphic Design</option>
                    <option value="branding">Logo & Branding</option>
                    <option value="photography">Photography</option>
                    <option value="motion">Motion / 3D</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Cover Image URL</label>
                  <ImageUploader
                    value={workData.image_url}
                    onChange={(url) => setWorkData({ ...workData, image_url: url })}
                    folder="works"
                    placeholder="Upload Cover Image"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Live URL (optional)</label>
                  <input
                    type="text"
                    value={workData.live_url}
                    onChange={(e) => setWorkData({ ...workData, live_url: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="font-medium cursor-pointer">Featured Project</Label>
                    <p className="text-xs text-slate-500">Show on homepage</p>
                  </div>
                  <Switch
                    checked={workData.is_featured}
                    onCheckedChange={(c) => setWorkData({ ...workData, is_featured: c })}
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="font-medium cursor-pointer">Published Status</Label>
                    <p className="text-xs text-slate-500">Visible publicly</p>
                  </div>
                  <Switch
                    checked={workData.is_published}
                    onCheckedChange={(c) => setWorkData({ ...workData, is_published: c })}
                  />
                </div>
`;

code = code.replace(settingsSection, newSettingsSection);

fs.writeFileSync('src/components/admin/ProjectBuilder.tsx', code);
