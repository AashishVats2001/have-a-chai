import connectDB from "@/app/db/connectDb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();

    const body = await req.json();
    const { query } = body;

    try {
        const users = await User.find({
            name: { $regex: query, $options: 'i' }
        }).limit(10);

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}