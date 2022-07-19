import mongoose from "mongoose";
const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    username: String,
    text: String,
    createdAt: Date,
  })
);
export default Comment;
