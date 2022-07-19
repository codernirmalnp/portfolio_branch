import { Request } from "express";
import { ObjectLiteral } from "typeorm";

interface RequestWithUser extends Request {
  user: ObjectLiteral;
}

export default RequestWithUser;
