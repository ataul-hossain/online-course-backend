import Course from "../models/Course.js";
import user from "../models/user.js";
import data from "../seedData/SeedCourses.js";
import dataOne from "../seedData/SeedOne.js";

export const seedCourse = async (req, res, next) => {
  try {
    await Course.deleteMany();
    const createdCourses = await Course.insertMany(data.courses);
    res.send({ createdCourses });
  } catch (error) {
    next(error);
  }
};
export const seedOneCourse = async (req, res, next) => {
  try {
    // await Course.deleteMany();
    const createdCourse = await Course.create(dataOne.course);
    res.send({ createdCourse });
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (req, res, next) => {
  const newCourse = new Course(req.body);

  try {
    const savedCourse = await newCourse.save();
    res.status(200).json(savedCourse);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const updatedCourse = await Course.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

export const getCourses = async (req, res, next) => {
  try {
    const allCourses = await Course.find();
    res.status(200).json(allCourses);
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const singleCourse = await Course.findOne({ _id: req.params.id });
    res.status(200).json(singleCourse);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const deletedCourse = await Course.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(deletedCourse);
  } catch (error) {
    next(error);
  }
};

export const enrollCourse = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    const updatedUser = await user.findByIdAndUpdate(userId, {
      $push: { enrolledCourses: courseId },
    });
    res.status(200).json({ message: "Enrolled Successfully" });
  } catch (error) {
    next(error);
  }
};
