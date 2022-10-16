import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import { DataStoredInToken } from "../authentication/token.interface";
import WrongAuthenticationTokenException from "../exceptions/ WrongAuthenticationTokenException";
import AuthenticationTokenMissing from "../exceptions/AuthenticationTokenMissingException";
import RequestWithUser from "../interface/requestWithUser.interface";
import userModal from "../users/user.model";

async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const req = request as RequestWithUser;
  const cookies = req.cookies.auth;
  const userRepo = userModal;
  if (cookies) {
    const secret = process.env.JWT_SECRET!;


    try {
      const verificationResponse = jwt.verify(
        cookies,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse._id;

      const user = await userRepo.findOne({ where: { id: id } });
      if (user) {
        req.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissing());
  }
}

export default authMiddleware;
