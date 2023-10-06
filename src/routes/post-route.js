const express = require("express");

const authenticateMiddleware = require("../middlewares/authenticate");
const uploadMiddleware = require("../middlewares/upload");
const postController = require("../controller/post-controller");

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

module.exports = router;
