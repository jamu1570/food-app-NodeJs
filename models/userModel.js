import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        userName: { type: String, required: [true, 'user name is required'] },
        email: { type: String, required: [true, 'email is required'], unique: true },
        password: { type: String, required: [true, 'password is required'] },
        address: { type: Array },
        phone: { type: String, required: [true, 'phone number is required'] },
        userType: {
            type: String,
            required: [true, 'user type is required'],
            default: 'client',
            enum: ['client', 'admin', 'vendor', 'driver'],
        },
        profile: {
            type: String,
            default:
                'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740',
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
