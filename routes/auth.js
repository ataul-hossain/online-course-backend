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
router.post("/register", register);
router.post("/create-user", createUser);
router.put("/update-user/:phone", updateUser);
router.delete("/delete-user/:phone", deleteUser);
router.get("/users", getUsers);
router.get("/user/:phone", getUser);
router.post("/enroll/", makePayment);
router.post("/cancelled/", cancelledPayment);

router.post("/create-course", createCourse);
router.put("/update-course/:id", updateCourse);
router.delete("/delete-course/:id", deleteCourse);
router.get("/courses", getCourses);
router.get("/course/:id", getCourse);
// router.get("/course/:seo_slug", getCourseBySlug);

router.post("/register", register);
router.post("/login", login);
// router.get("/seed", seedCourse);
// router.get("/seed-one", seedOneCourse);

export default router;
