import { NextResponse } from "next/server";
import axios from "axios";


export async function POST(req) {
    try {
        const body = await req.json();
        const { key_id, key_secret } = body

        if (!key_id || !key_secret) {
            return NextResponse.json({ success: false, message: 'Missing key_id or key_secret' }, { status: 400 })
        }

        const response = await axios.get('https://api.razorpay.com/v1/payments', {
            auth: {
                username: key_id,
                password: key_secret
            }
        })
        return NextResponse.json({ success: true, message: response.data }, { status: 200 })
    } catch (err) {
        if (err.response?.status === 401) {
            return NextResponse.json({ success: false, message: 'Invalid Razorpay credentials' }, { status: 401 })
        }

        console.error('credentials Verification error: ', error.message)
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
    }
}