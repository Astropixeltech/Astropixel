const { v2: cloudinary } = require('cloudinary');
const path = require('path');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dzuex7n2u',
  api_key: process.env.CLOUDINARY_API_KEY || '519657731215162',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'mP30a_eW3_m_8f2R0x9wG-qLz9k',
  secure: true,
});

const filePath = path.resolve(__dirname, '../public/sofiullah-ahammad.jpg');

async function run() {
  try {
    console.log('Uploading new Sofiullah photo to Cloudinary...');
    const res = await cloudinary.uploader.upload(filePath, {
      folder: 'astropixel-media/team',
      public_id: 'sofiullah-ahammad-v3',
      overwrite: true,
    });
    console.log('SUCCESS! Cloudinary URL:');
    console.log(res.secure_url);
  } catch (err) {
    console.error('Cloudinary API upload error:', err);
  }
}

run();
