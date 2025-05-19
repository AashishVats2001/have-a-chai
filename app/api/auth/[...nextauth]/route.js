import NextAuth from 'next-auth'
import connectDB from '@/app/db/connectDb'
import mongoose from 'mongoose'
import User from '@/app/models/User'
import Payment from '@/app/models/Payment'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from "next-auth/providers/github"

export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // AppleProvider({
        //   clientId: process.env.APPLE_ID,
        //   clientSecret: process.env.APPLE_SECRET
        // }),
        FacebookProvider({
          clientId: process.env.FACEBOOK_ID,
          clientSecret: process.env.FACEBOOK_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            try {
                await connectDB();

                // Check if user already exists
                let currentUser = await User.findOne({ email: user.email });

                if (!currentUser) {
                    console.log("Creating user with:", {
                        coverpic: process.env.NEXT_PUBLIC_DEFAULT_COVER_PICTURE,
                        coverpicpublicid: process.env.NEXT_PUBLIC_DEFAULT_COVER_PUBLIC_ID,
                        profilepic: process.env.NEXT_PUBLIC_DEFAULT_PROFILE_PICTURE,
                        profilepicpublicid: process.env.NEXT_PUBLIC_DEFAULT_PROFILE_PUBLIC_ID
                    });
                    const newUser = await User.create({
                        name: user.name || user.email,
                        email: user.email,
                        username: user.email.split("@")[0],                        
                        coverpic: process.env.NEXT_PUBLIC_DEFAULT_COVER_PICTURE,
                        coverpicpublicid: process.env.NEXT_PUBLIC_DEFAULT_COVER_PUBLIC_ID,
                        profilepic: process.env.NEXT_PUBLIC_DEFAULT_PROFILE_PICTURE,
                        profilepicpublicid: process.env.NEXT_PUBLIC_DEFAULT_PROFILE_PUBLIC_ID
                    
                    });
                    console.log(`✅ New user created:`, newUser);
                } else {
                    user.name = currentUser.username; // Set custom username for session
                }

                return true;
            } catch (error) {
                console.error('❌ Error during sign in:', error);
                return false;
            }
        },

        async session({ session }) {
            try {
                await connectDB();

                const dbUser = await User.findOne({ email: session.user.email });
                if (dbUser) {
                    session.user.name = dbUser.username;
                    session.user.id = dbUser._id.toString();
                }

                return session;
            } catch (error) {
                console.error('❌ Error in session callback:', error);
                return session;
            }
        }
    }
})

export { authoptions as GET, authoptions as POST }