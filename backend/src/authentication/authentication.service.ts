import CreateUserDto from "./createuse.dto";
import * as bcrypt from "bcrypt";
import UserWithThatEmailAlreadyExistException from "../exceptions/UserWithThatEmailAlreadyExistException";
import { DataStoredInToken, TokenData } from "./token.interface";
import * as jwt from "jsonwebtoken";
import userModal from "./../users/user.model";
import User from "../users/user.interface";

class AuthenticationService {
  public user = userModal;
  public async register(userData: CreateUserDto) {
    if (await this.user.findOne({ email: userData.email })) {
      throw new UserWithThatEmailAlreadyExistException(userData.email);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userCreate = await this.user.create({
      ...userData,
      hashedPassword: hashedPassword,
    });
    Reflect.deleteProperty(userCreate, "password");
    const tokenData = this.createToken(userCreate);
    const cookie = this.createCookie(tokenData);
    return {
      cookie,
      userCreate,
    };
  }
  public createCookie(tokenData: TokenData) {
    return tokenData.token;
  }
  public createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET!;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}
export default AuthenticationService;
