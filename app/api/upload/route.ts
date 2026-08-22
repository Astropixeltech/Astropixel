import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'astropixel-uploads';
    const resourceType = ((formData.get('resource_type') as string) || 'auto') as 'image' | 'video' | 'raw' | 'auto';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await uploadToCloudinary(buffer, folder, resourceType);

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url || uploadResult.url,
      public_id: uploadResult.public_id,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      resource_type: uploadResult.resource_type,
      bytes: uploadResult.bytes,
    });
  } catch (error: any) {
    console.error('Cloudinary upload API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload media to Cloudinary' },
      { status: 500 }
    );
  }
}
