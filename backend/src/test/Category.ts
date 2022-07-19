import mongoose from "mongoose";
const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: String,
    description: String,
  })
);
export default Category;
