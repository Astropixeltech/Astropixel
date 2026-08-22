import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary server-side SDK
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dzuex7n2u',
  api_key: process.env.CLOUDINARY_API_KEY || '519657731215162',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'mP30a_eW3_m_8f2R0x9wG-qLz9k',
  secure: true,
});

export default cloudinary;

export interface CloudinaryUploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  format: string;
  width?: number;
  height?: number;
  resource_type: string;
  bytes: number;
}

/**
 * Upload a File buffer or base64 string to Cloudinary
 */
export async function uploadToCloudinary(
  file: string | Buffer,
  folder = 'astropixel-assets',
  resourceType: 'image' | 'video' | 'raw' | 'auto' = 'auto'
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    if (typeof file === 'string' && (file.startsWith('http://') || file.startsWith('https://') || file.startsWith('data:'))) {
      cloudinary.uploader.upload(
        file,
        {
          folder,
          resource_type: resourceType,
          overwrite: true,
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error, result) => {
          if (error || !result) return reject(error || new Error('Upload failed'));
          resolve({
            url: result.url,
            secure_url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
            resource_type: result.resource_type,
            bytes: result.bytes,
          });
        }
      );
    } else if (Buffer.isBuffer(file)) {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error, result) => {
          if (error || !result) return reject(error || new Error('Upload failed'));
          resolve({
            url: result.url,
            secure_url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
            resource_type: result.resource_type,
            bytes: result.bytes,
          });
        }
      );
      uploadStream.end(file);
    } else {
      reject(new Error('Invalid file format for Cloudinary upload'));
    }
  });
}
