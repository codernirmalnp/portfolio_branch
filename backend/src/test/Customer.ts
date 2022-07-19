import * as mongoose from "mongoose";

export const CustomerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
