import mongoose, { mongo } from 'mongoose';
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    name: { type: String, required: true },
    to_user: { type: String, required: true },
    oid: { type: String, required: true },
    message: { type: String, default: "" },
    amount: { type: Number, required: true },
    done: { type: Boolean, default: false }
},
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    })


export default mongoose.models.Payment || model("Payment", PaymentSchema);