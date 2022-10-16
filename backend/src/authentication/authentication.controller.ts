import * as bcrypt from "bcrypt";
import { Router, Request, Response, NextFunction } from "express";
import Controller from "../interface/controller.interface";
import userModal from "../users/user.model";
import validateMiddleware from "../middleware/validaton.middleware";
import CreateUserDto from "./createuse.dto";
import LoginDto from "./loginIn.dto";
import WrongCredentialsException from "../exceptions/WrongCrendentialsExceptions";
import AuthenticationService from "./authentication.service";
import SuccessException from "../exceptions/SuccessException";
import authMiddleware from "../middleware/auth.middleware";
type UserData={
  name:string,
  email:string
}
interface RequestWithUser extends Request{
  user:UserData

}

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = Router();
  public authenticationService = new AuthenticationService();
  public user = userModal;

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validateMiddleware(CreateUserDto),
      this.registration
    );
    this.router.post(
      `${this.path}/login`,
      validateMiddleware(LoginDto),
      this.loggingIn
    );
    this.router.get(
      `${this.path}/me`,
      authMiddleware,
      this.getCurrentUser
    );

    this.router.post(`${this.path}/logout`, this.loggingOut);
  }

  private registration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = req.body;
   
    try {
      const { cookie, userCreate } = await this.authenticationService.register(
        userData
      );
    

      
      res.cookie("auth", cookie, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        maxAge: 60 * 60 * 10000,
      });
      
     
      res.send({success:true,user:{id:userCreate._id, email:userCreate.email,name:userCreate.name}});
    } catch (error) {
      next(error);
    }
  };
  private loggingIn = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const logInData: LoginDto = request.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password
      );
      if (isPasswordMatching) {
        const tokenData = this.authenticationService.createToken(user);
        const cookie = this.authenticationService.createCookie(tokenData);
        response.cookie("auth", cookie, {
          secure: process.env.NODE_ENV !== "development",
          httpOnly: true,
          maxAge: 60 * 60 * 10000,
        });
        response.send(new SuccessException("Login Successfull",user))
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };
  private getCurrentUser = (request: RequestWithUser, response: Response) => {
    response.send(request.user);
  };
  private loggingOut = (request: Request, response: Response) => {
    response.clearCookie("auth");
    response.send(200);
  };
}
export default AuthenticationController;
