const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dzuex7n2u',
  api_key: process.env.CLOUDINARY_API_KEY || '519657731215162',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'mP30a_eW3_m_8f2R0x9wG-qLz9k',
  secure: true,
});

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

const remoteUrls = [
  { key: 'sofiullah', url: 'https://ayqbpqgahtycrncbknvj.supabase.co/storage/v1/object/public/media-uploads/instructors/sofiullah-learn.png' },
  { key: 'adib', url: 'https://ayqbpqgahtycrncbknvj.supabase.co/storage/v1/object/public/media-uploads/team-members/adib-sarkar-v2.png' },
  { key: 'rashadul', url: 'https://ayqbpqgahtycrncbknvj.supabase.co/storage/v1/object/public/media-uploads/team/rashadul-islam-naime.png' },
  { key: 'shafiul', url: 'https://ayqbpqgahtycrncbknvj.supabase.co/storage/v1/object/public/media-uploads/team-members/shafiul-haque-v2.png' },
  { key: 'prantik', url: 'https://ayqbpqgahtycrncbknvj.supabase.co/storage/v1/object/public/media-uploads/team-members/prantik-saha-v2.png' },
  { key: 'papiya', url: 'https://astropixel.tech/__l5e/assets-v1/0a204790-d31e-409a-91d9-234fb273511a/papiya.png' },
  { key: 'nayeem', url: 'https://ayqbpqgahtycrncbknvj.supabase.co/storage/v1/object/public/media-uploads/instructors/nayeem-learn.png' },
];

async function runUploads() {
  console.log('Starting Cloudinary Batch Upload...');
  const uploadedMap = {};

  // 1. Upload remote team member URLs
  for (const item of remoteUrls) {
    try {
      console.log(`Uploading remote URL for ${item.key}...`);
      const res = await cloudinary.uploader.upload(item.url, {
        folder: 'astropixel-media/team',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });
      uploadedMap[item.key] = res.secure_url;
      console.log(`✓ ${item.key} -> ${res.secure_url}`);
    } catch (err) {
      console.error(`✗ Error uploading ${item.key}:`, err.message);
    }
  }

  // 2. Upload public/services files
  const servicesDir = path.join(publicDir, 'services');
  if (fs.existsSync(servicesDir)) {
    const files = fs.readdirSync(servicesDir);
    for (const file of files) {
      if (file.endsWith('.webp') || file.endsWith('.png') || file.endsWith('.jpg')) {
        const filePath = path.join(servicesDir, file);
        try {
          console.log(`Uploading service mockup ${file}...`);
          const res = await cloudinary.uploader.upload(filePath, {
            folder: 'astropixel-media/services',
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          });
          uploadedMap[`service_${file}`] = res.secure_url;
          console.log(`✓ service_${file} -> ${res.secure_url}`);
        } catch (err) {
          console.error(`✗ Error uploading service_${file}:`, err.message);
        }
      }
    }
  }

  // 3. Upload favicons & og-image
  const rootPublicFiles = ['favicon.png', 'og-image.png', 'apple-touch-icon.png'];
  for (const file of rootPublicFiles) {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
      try {
        console.log(`Uploading root public asset ${file}...`);
        const res = await cloudinary.uploader.upload(filePath, {
          folder: 'astropixel-media/site',
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        });
        uploadedMap[`site_${file}`] = res.secure_url;
        console.log(`✓ site_${file} -> ${res.secure_url}`);
      } catch (err) {
        console.error(`✗ Error uploading site_${file}:`, err.message);
      }
    }
  }

  console.log('\n=============================================');
  console.log('FINAL CLOUDINARY URL MAP:');
  console.log(JSON.stringify(uploadedMap, null, 2));
  console.log('=============================================\n');
}

runUploads();
