import { NextResponse } from "next/server";
import cloudinary from 'cloudinary'

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    const DEFAULT_PUBLIC_IDS = [
        process.env.NEXT_PUBLIC_DEFAULT_PROFILE_PUBLIC_ID,
        process.env.NEXT_PUBLIC_DEFAULT_COVER_PUBLIC_ID
    ];

    try {
        const { publicId } = await req.json();

        if (!publicId) {
            return NextResponse.json({ success: false, message: 'Missing publicId' }, { status: 400 });
        }
        if (DEFAULT_PUBLIC_IDS.includes(publicId)) {
            return NextResponse.json({
                success: false,
                message: 'Cannot delete default image'
            }, { status: 403 });
        }
        
        const result = await cloudinary.v2.uploader.destroy(publicId)
        // console.log('Cloudinary delete result:', result);


        if (result.result !== 'ok' && result.result !== 'not found') {
            return NextResponse.json({ success: false, message: 'Failed to delete image' }, { status: 500 });
        }
        // console.log('Image delete successfully');

        return NextResponse.json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
