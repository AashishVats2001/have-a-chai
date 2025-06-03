import connectDB from "@/app/db/connectDb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();
    const usernames = [
        'wildertrails',
        'burningfeathersband',
        'thepawprintlife',
        'ConnorPlaysGuitar',
        'aashishvatsdev'
  
    ];

    const body = await req.json();
    const { query } = body;

    try {
        let users;

        if (query && query.trim() !== "") {
            // If there's a search query, perform a regex search
            users = await User.find({
                name: { $regex: query, $options: 'i' }
            }).limit(10);
        } else {
            // Otherwise, return the default featured usernames
            users = await User.find({ username: { $in: usernames } })
                .select('name username profilepic') // limit fields if needed
                .lean();

            // Maintain the given order
            users = usernames.map(username => users.find(user => user.username === username)).filter(Boolean);
        }

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}