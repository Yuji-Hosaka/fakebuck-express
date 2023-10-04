const cloudinary = require("../config/cloudinary");
const createError = require("../utils/create-error");
const { upload } = require("../utils/cloudinary-ser");
const prisma = require('../models/prisma')
const fs = require('fs/promises')

exports.updateProfile = async (req, res, next) => {
  try {
    if (!req.files) {
      return next(createError("Profile image or Cover image is required"));
    }

    const response = {}

    if (req.files.profileImage) {
      const url = await upload(req.files.profileImage[0].path);
      response.profileImage = url
      await prisma.user.update({
        data: {
          profileImage: url
        },
        where: {
          id: req.user.id
        }
      })
    }
    if (req.files.coverImage) {
      const url = await upload(req.files.coverImage[0].path);
      response.coverImage = url
      await prisma.user.update({
        data: {
          coverImage: url
        },
        where: {
          id: req.user.id
        }
      })
    }
    
    res.status(200).json(response);
  } catch (err) {
    next(err);
  } finally{
    if(req.files.profileImage) {
      fs.unlink(req.files.profileImage[0].path)
    }
    if(req.files.coverImage) {
      fs.unlink(req.files.coverImage[0].path)
    }
  }
};
