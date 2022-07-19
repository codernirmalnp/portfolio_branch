import App from "./app";
import PostsController from "./posts/posts.controller";
import UploadController from "./file/upload.controller";
import "dotenv/config";
import "reflect-metadata";
import validateEnv from "./utils/validateEnv";
import AuthenticationController from "./authentication/authentication.controller";
import UserController from "./users/user.controller";
import Tutorial from "./test/Tutorial";
import Image from "./test/Image";
import Comment from "./test/Comment";
import Category from "./test/Category";

validateEnv();

const createTutorial = function (tutorial) {
  return Tutorial.create(tutorial).then((docTutorial) => {
    console.log("\n>> Created Tutorial:\n", docTutorial);
    return docTutorial;
  });
};

const createImage = function (tutorialId, image) {
  return Image.create(image).then((docImage) => {
    console.log("\n>> Created Image:\n", docImage);
    return Tutorial.findByIdAndUpdate(
      tutorialId,
      {
        $push: {
          images: {
            _id: docImage._id,
            url: docImage.url,
            caption: docImage.caption,
          },
        },
      },
      { new: true, useFindAndModify: false }
    );
  });
};

const createComment = function (tutorialId, comment) {
  return Comment.create(comment).then((docComment) => {
    console.log("\n>> Created Comment:\n", docComment);
    return Tutorial.findByIdAndUpdate(
      tutorialId,
      { $push: { comments: docComment._id } },
      { new: true, useFindAndModify: false }
    );
  });
};

// const run = async function () {
//   var tutorial = await createTutorial({
//     title: "Tutorial #1",
//     author: "bezkoder",
//   });
//   tutorial = await createComment(tutorial._id, {
//     username: "jack",
//     text: "This is a great tutorial.",
//     createdAt: Date.now(),
//   });
//   console.log("\n>> Tutorial:\n", tutorial);
//   tutorial = await createComment(tutorial._id, {
//     username: "mary",
//     text: "Thank you, it helps me alot.",
//     createdAt: Date.now(),
//   });
//   console.log("\n>> Tutorial:\n", tutorial);
// };

// run();
const createCategory = function (category) {
  return Category.create(category).then((docCategory) => {
    console.log("\n>> Created Category:\n", docCategory);
    return docCategory;
  });
};

const addTutorialToCategory = function (tutorialId, categoryId) {
  return Tutorial.findByIdAndUpdate(
    tutorialId,
    { category: categoryId },
    { new: true, useFindAndModify: false }
  );
};

// const getTutorialWithPopulate = function (id) {
//   return Tutorial.findById(id).populate("comments");
// };
const run = async function () {
  var tutorial = await createTutorial({
    title: "Tutorial #1",
    author: "bezkoder",
  });
  var category = await createCategory({
    name: "Node.js",
    description: "Node.js tutorial",
  });
  tutorial = await addTutorialToCategory(tutorial._id, category._id);
  console.log("\n>> Tutorial:\n", tutorial);
};
// run();

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
