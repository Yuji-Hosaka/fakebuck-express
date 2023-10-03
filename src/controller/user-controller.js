exports.updateProfile = async (req, res, next) => {
  try {
    res.status(200).json({message: 'Correct'})
  } catch (err) {
    next(err);
  }
};
