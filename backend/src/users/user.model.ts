import mongoose from "mongoose";
import User from "./user.interface";
const addressSchema = new mongoose.Schema({
  city: String,
  street: String,
});
const userSchema = new mongoose.Schema({
  address: addressSchema,
  name: String,
  email: String,
  password: String,
  posts: [
    {
      ref: "Posts",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const userModal = mongoose.model<User & mongoose.Document>("User", userSchema);
export default userModal;
