const express = require("express");

const authenticateMiddleware = require("../middlewares/authenticate");
const friendController = require("../controller/friend-controller");

const router = express.Router();

router.post(
  "/:receiverId",
  authenticateMiddleware,
  friendController.requestFriend
);

router.patch(
  "/:requesterId",
  authenticateMiddleware,
  friendController.acceptRequest
);

router.delete(
  "/:requesterId/reject",
  authenticateMiddleware,
  friendController.rejectRequest
);
router.delete(
  "/:receiverId/cancel",
  authenticateMiddleware,
  friendController.cancelRequest
);

module.exports = router;
