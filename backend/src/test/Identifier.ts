import * as mongoose from "mongoose";
import { CustomerSchema } from "./Customer";

const Identifier = mongoose.model(
  "Identifier",
  new mongoose.Schema({
    cardCode: String,
    customer: CustomerSchema,
  })
);

export default Identifier;
