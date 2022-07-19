import { Application } from "express";
import * as express from "express";
import Controller from "./interface/controller.interface";
import * as cors from "cors";
import mongoose from "mongoose";
import errorMiddleware from "./middleware/error.middleware";
import * as cookieParser from "cookie-parser";

class App {
  public app: Application;
  public port: number;
  public url: string;

  constructor(controllers: Controller[], port: number) {
    this.url =
      "mongodb://root:password@localhost:27017/mydbname?authSource=admin";
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.connectToDatabase();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use("/upload", express.static("upload"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );
    this.app.use(cookieParser());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
  private connectToDatabase() {
    mongoose
      .connect(this.url)
      .then((_) => console.log(`MongoDB Connected`))
      .catch((err) => {
        console.log(err);
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
