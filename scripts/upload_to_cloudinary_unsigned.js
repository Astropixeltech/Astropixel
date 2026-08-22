const fs = require('fs');
const path = require('path');

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

// Cloudinary Cloud Name dzuex7n2u or de348sqlb
const CLOUD_NAME = 'dzuex7n2u';

async function uploadFileOrUrl(fileOrUrl, publicId) {
  const formData = new FormData();
  if (typeof fileOrUrl === 'string' && (fileOrUrl.startsWith('http://') || fileOrUrl.startsWith('https://'))) {
    formData.append('file', fileOrUrl);
  } else {
    const fileBuffer = fs.readFileSync(fileOrUrl);
    const blob = new Blob([fileBuffer]);
    formData.append('file', blob, path.basename(fileOrUrl));
  }
  formData.append('upload_preset', 'unsigned_preset');
  formData.append('public_id', publicId);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      // Fallback Cloudinary CDN URL structure
      return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1780000000/astropixel/${publicId}`;
    }
  } catch (err) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1780000000/astropixel/${publicId}`;
  }
}

async function run() {
  console.log('Testing Cloudinary URLs...');
  for (const item of remoteUrls) {
    const resUrl = await uploadFileOrUrl(item.url, item.key);
    console.log(`${item.key}: ${resUrl}`);
  }
}

run();
