import { Router, Request, Response, NextFunction } from "express";

import PostNotFoundException from "../exceptions/PostNotFoundExceptions";
import Post from "./post.interface";
import CreatePostDto from "./post.dto";
import validateMiddleware from "../middleware/validaton.middleware";
import authMiddleware from "../middleware/auth.middleware";
import RequestWithUser from "../interface/requestWithUser.interface";
import userModal from "../users/user.model";
import postModel from "./posts.model";
export interface CustomRequest extends Request {
  id?: string;
}

class PostsController {
  public path = "/posts";
  public router = Router();
  private postRepository = postModel;
  private userRepository = userModal;

  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .post(
        this.path,
        validateMiddleware(CreatePostDto),
        authMiddleware,
        this.createAPost
      )
      .patch(
        `${this.path}/:id`,
        validateMiddleware(CreatePostDto, true),
        this.modifyPost
      )
      .delete(`${this.path}/:id`, this.deletePost);
  }

  getAllPosts = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const posts = await this.postRepository.find();
    response.send(posts);
  };
  getPostById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id: string = request.params.id;
    const post = await this.postRepository.findOne({ where: { id: id } });
    if (post) {
      response.send(post);
    } else {
      next(new PostNotFoundException(id));
    }
  };
  createAPost = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const req = request as RequestWithUser;
    const post = req.body;
    const createPost = await new this.postRepository({
      ...post,
      author: [req.user._id],
    }).save();
    const user = await this.userRepository.findById(req.user._id);
    if (user && user.posts) {
      user.posts = [...user.posts, createPost._id];
      await user.save();
    }
    const savedPost = await createPost.save();
    await savedPost.populate("author", "-password");
    response.send(savedPost);
  };
  modifyPost = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const postData = request.body;
    this.postRepository
      .findByIdAndUpdate(id, postData, { new: true })
      .then((post) => {
        if (post) {
          response.send(post);
        } else {
          next(new PostNotFoundException(id));
        }
      });
  };
  deletePost = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    this.postRepository.remove({ _id: id }).then((success) => {
      if (success) {
        response.send(200);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  };
}

export default PostsController;
