import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Sale", "Member", "Customer"],
      default: "Member",
    },
    address: String,
    phonenumber: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("user", userSchema);
