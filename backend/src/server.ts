import App from "./app";
import PostsController from "./posts/posts.controller";
import UploadController from "./file/upload.controller";
import "dotenv/config";
import "reflect-metadata";
import validateEnv from "./utils/validateEnv";
import AuthenticationController from "./authentication/authentication.controller";
import UserController from "./users/user.controller";

validateEnv();

const app = new App(
  [
    new PostsController(),
    new UploadController(),
    new AuthenticationController(),
    new UserController(),
  ],
  5000
);

app.listen();
