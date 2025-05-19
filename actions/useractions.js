"use server"

import Razorpay from "razorpay"
import Payment from "@/app/models/Payment"
import connectDB from "@/app/db/connectDb"
import User from "@/app/models/User"
import { encrypt, decrypt } from "@/lib/encyption"

export const initiate = async (amount, to_username, paymentForm) => {
    await connectDB();

    // Fetch user details
    const user = await User.findOne({ username: to_username });

    if (!user) {
        throw new Error("Recipient user not found.");
    }

    let razorpaysecret;
    try {
        if (!user.razorpaysecret || !user.razorpayid) {
            throw new Error("Missing Razorpay credentials.");
        }

        razorpaysecret = decrypt(user.razorpaysecret);
    } catch (err) {
        console.error("Decryption or credentials error:", err.message);
        throw new Error("Invalid or missing Razorpay credentials. Please update your payment settings.");
    }

    const razorpayid = user.razorpayid;

    let instance;
    try {
        instance = new Razorpay({
            key_id: razorpayid,
            key_secret: razorpaysecret,
        });
    } catch (err) {
        console.error("Error initializing Razorpay instance:", err.message);
    }

    const options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    };

    let order;
    try {
        order = await instance.orders.create(options);
    } catch (err) {
        console.error("Error creating Razorpay order:", err.message);
        throw new Error("Failed to create payment order. Please try again later.");
    }

    if (!paymentForm.name) {
        throw new Error("Name is required for the payment.");
    }

    await Payment.create({
        name: paymentForm.name,
        to_user: to_username,
        oid: order.id,
        message: paymentForm.message || "",
        amount: amount,
    });

    return order;
};

export const fetchUser = async (username) => {
    await connectDB();

    let u = await User.findOne({ username: username });

    // Check if the user exists before calling toObject
    if (!u) {
        throw new Error(`User with username ${username} not found`);
    }

    let user = u.toObject({ flattenObjectIds: true });

    // Decrypt the Razorpay secret if it exists
    if (user.razorpaysecret && user.razorpaysecret !== "") {
        try {
            user.razorpaysecret = decrypt(user.razorpaysecret);
        } catch (err) {
            console.error('Error decrypting Razorpay secret:', err.message);
            user.razorpaysecret = null; // Optional: fallback to null or handle accordingly
        }
    }

    return user;
}

export const fetchPayments = async (username) => {
    try {
        await connectDB();

        // Find all payments to the user and sort them by amount in descending order
        let payments = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean();

        if (!payments || payments.length === 0) {
            console.log(`No payments found for user: ${username}`);
            return []; // Return empty array if no payments are found
        }
        const cleanPayments = payments.map((payment) => ({
            ...payment,
            _id: payment._id.toString(),   // Convert ObjectId to string
            createdAt: payment.createdAt.toISOString(),  // Convert Date to string
            updatedAt: payment.updatedAt.toISOString(),  // Convert Date to string
        }));

        // console.log(`Payments found for user: ${username}`, cleanPayments);
        return cleanPayments;
    } catch (error) {
        console.error(`Error fetching payments for user: ${username} `, error);
        throw new Error('Failed to fetch payments');
    }
}


export const updateProfile = async (data, oldUsername) => {
    await connectDB();

    const ndata = { ...data }; // avoid mutating original input

    // Username conflict check
    if (ndata.username && ndata.username !== oldUsername) {
        const existingUser = await User.findOne({ username: ndata.username });
        if (existingUser) {
            throw new Error("Username already exists.");
        }
    }

    // Disallow email updates
    delete ndata.email;

    // Encrypt Razorpay secret if provided
    if (typeof ndata.razorpaysecret === 'string' && ndata.razorpaysecret !== '') {
        ndata.razorpaysecret = encrypt(ndata.razorpaysecret);
    }

    // --- Sanitize socials ---
    if (ndata.socials && typeof ndata.socials === 'object') {
        const isValid =
            Object.keys(ndata.socials).every(key => typeof key === 'string') &&
            Object.values(ndata.socials).every(val => typeof val === 'string');

        if (!isValid) {
            try {
                const socialsArray = Object.values(ndata.socials);
                ndata.socials = socialsArray.reduce((acc, curr) => {
                    if (curr.platform && curr.url) {
                        acc[curr.platform] = curr.url;
                    }
                    return acc;
                }, {});
            } catch (err) {
                console.warn("Invalid socials format. Skipping save.");
                delete ndata.socials;
            }
        }
    }

    // Build update fields
    const updateFields = {};
    for (const key in ndata) {
        if (['razorpayid', 'razorpaysecret'].includes(key)) {
            updateFields[key] = ndata[key]; // allow empty strings
        } else if (ndata[key] && ndata[key] !== "") {
            updateFields[key] = ndata[key];
        }
    }

    // Update the User document
    await User.updateOne({ username: oldUsername }, updateFields);

    console.log("Final socials to be saved:", ndata.socials);

    // Update username in payment records if changed
    if (ndata.username && ndata.username !== oldUsername) {
        await Payment.updateMany({ to_user: oldUsername }, { to_user: ndata.username });
    }
};


// DELETE ACCOUNT
export const deleteUser = async (username) => {
    await connectDB();
    try {
        const user = await User.findOneAndDelete({ username }).lean();

        return { success: true };
    } catch (err) {
        console.error('Failed to delete user:', err);
        return { success: false, message: err.message };
    }
};