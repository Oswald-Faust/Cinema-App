import mongoose from "mongoose";

const UserSchema = mongoose.Schema ( {
    fullName: {
        type: String,
        required: [true, "Please add a full name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    image: {
        type: String,
    },
    isAdmin: {
        type : Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'secretaryAdmin', 'posterAdmin'],
        default: 'user'
      },
      permissions: {
        type: [String],
        default: []
      },
},
);

export default mongoose.model("User", UserSchema);

