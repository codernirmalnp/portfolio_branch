import * as express from "express";
import NotAuthorizedException from "../exceptions/ NotAuthorizedException";
import Controller from "../interface/controller.interface";
import RequestWithUser from "../interface/requestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import postModel from "../posts/posts.model";

class UserController implements Controller {
  public path = "/users";
  public router = express.Router();
  private post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:id/posts`,
      authMiddleware,
      this.getAllPostsOfUser
    );
  }

  private getAllPostsOfUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const req = request as RequestWithUser;
    const userId = request.params.id;

    if (userId === req.user.id.toString()) {
      const posts = await this.post
        .find({ author: userId })
        .populate("author", "-password");
      response.send(posts);
    }
    next(new NotAuthorizedException());
  };
}

export default UserController;
