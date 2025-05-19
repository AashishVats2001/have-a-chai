import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment";
import User from "@/app/models/User";
import connectDB from "@/app/db/connectDb";
import { decrypt } from "@/lib/encyption";

export const POST = async (req) => {
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)

    //Check if rzorpayORderID is present on the server
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({ sucess: false, message: "Order ID Not Found" })
    }

    //Fetch the razorpay secret of the user who is getting the payment
    let user = await User.findOne({ username: p.to_user })
    const razorpaysecret = decrypt(user.razorpaysecret)


    //Verify the payment
    let xx = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, razorpaysecret)

    if (xx) {
        //Update the payment status
        const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: "true" }, { new: "true" })
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    } else {
        return NextResponse.json({ sucess: false, message: "Payment Verification Failed" })
    }
}