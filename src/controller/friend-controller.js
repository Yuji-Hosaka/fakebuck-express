const { STATUS_PENDING } = require("../config/constants");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const { checkReceiverIdSchema } = require("../validators/user-validator");

exports.requestFriend = async (req, res, next) => {
  try {
    const { error, value } = checkReceiverIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }

    if (value.receiverId === req.user.id) {
      return next(createError("Cannot request yourself", 400));
    }

    const targetUser = await prisma.user.findUnique({
      where: {
        id: value.receiverId,
      },
    });

    if (!targetUser) {
      return next(createError("User does not exist", 400));
    }

    const existRelationship = await prisma.friend.findFirst({
      where: {
        OR: [
          { requesterId: req.user.id, receiverId: value.receiverId },
          { requesterId: value.receiverId, receiverId: req.user.id },
        ],
      },
    });

    if (existRelationship) {
      return next(createError("User already had relationship", 400));
    }

    await prisma.friend.create({
      data: {
        requesterId: req.user.id,
        receiverId: value.receiverId,
        status: STATUS_PENDING,
      },
    });
    res.status(201).json({ message: "request has been sent" });
  } catch (err) {
    next(err);
  }
};
