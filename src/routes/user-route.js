const express = require("express");

const authenticateMiddleware = require("../middlewares/authenticate");
const userController = require("../controller/user-controller");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.patch(
  "/",
  authenticateMiddleware,
  uploadMiddleware.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  userController.updateProfile
);

module.exports = router;
