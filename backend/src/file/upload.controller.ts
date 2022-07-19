import * as express from "express";
import * as multer from "multer";
import { fileFilter, fileStorage } from "../utils/multer";
export const UploadFile = () => {};
class UploadController {
  public path = "/upload";
  public upload = multer({ storage: fileStorage, fileFilter: fileFilter });
  public router = express.Router();

  constructor() {
    this.initlizeRoutes();
  }
  initlizeRoutes() {
    this.router.post(this.path, this.upload.single("file"), this.uploadFiles);
  }

  uploadFiles(req: express.Request, res: express.Response) {
    res.json({ message: "Successfully uploaded files", file: req.file });
  }
}

export default UploadController;
