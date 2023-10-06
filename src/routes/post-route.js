const express = require("express");

const authenticateMiddleware = require("../middlewares/authenticate");
const uploadMiddleware = require("../middlewares/upload");
const postController = require("../controller/post-controller");
const likeController = require("../controller/like-controller");

const router = express.Router();

router.post(
  "/",
  authenticateMiddleware,
  uploadMiddleware.single("image"),
  postController.createPost
);

router.get(
  "/friend",
  authenticateMiddleware,
  postController.getAllPostIncludeFriendPost
);

router.post("/:postId/like", authenticateMiddleware, likeController.toggleLike);

module.exports = router;
