import user from "../models/user.js";

export const createUser = async (req, res, next) => {
  const newUser = new user(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await user.findOneAndUpdate(
      req.params.phone,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const allUsers = await user.find();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const singleuser = await user.findOne({ phone: req.params.phone });
    res.status(200).json(singleuser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await user.findOneAndDelete({
      phone: req.params.phone,
    });
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};
