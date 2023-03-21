import express from "express";
import axios from "axios";
import otp from "../models/otp.js";
import {
  cancelledPayment,
  checkPhoneNumber,
  login,
  makePayment,
  register,
  sendOTP,
  verifyOTP,
} from "../controllers/authController.js";
import {
  createUser,
  updateUser,
  getUsers,
  getUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import {
  createCourse,
  deleteCourse,
  enrollCourse,
  getCourse,
  getCourses,
  seedCourse,
  seedOneCourse,
  updateCourse,
} from "../controllers/courseController.js";

const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next) => {
//   res.send("Authenticated");
// });
// router.get("/checkuser/:phone", verifyUser, (req, res, next) => {
//   res.send("Welcome user you can delete your account");
// });
// router.get("/checkadmin/:phone", verifyAdmin, (req, res, next) => {
//   res.send("Welcome user you can delete all accounts");
// });

router.post("/send-otp", checkPhoneNumber, sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/create-user", verifyAdmin, createUser);
router.put("/update-user/:phone", verifyUser, updateUser);
router.delete("/delete-user/:phone", verifyUser, deleteUser);
router.get("/users", verifyAdmin, getUsers);
router.get("/user/:phone", getUser);
router.post("/enroll/", makePayment);
router.post("/cancelled/", cancelledPayment);

router.post("/create-course", verifyAdmin, createCourse);
router.put("/update-course/:id", verifyAdmin, updateCourse);
router.delete("/delete-course/:id", verifyAdmin, deleteCourse);
router.get("/courses", getCourses);
router.get("/course/:id", getCourse);
// router.get("/course/:seo_slug", getCourseBySlug);

router.post("/register", register);
router.post("/login", login);
// router.get("/seed", seedCourse);
// router.get("/seed-one", seedOneCourse);

export default router;
