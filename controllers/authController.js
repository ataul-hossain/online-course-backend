import axios from "axios";
import otp from "../models/otp.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import user from "../models/user.js";
import { createError } from "../utils/error.js";

export const checkPhoneNumber = async (req, res, next) => {
  try {
    const userPhone = req.body.phone;
    const existPhone = await user.findOne({ phone: userPhone });
    if (existPhone) {
      console.log("User Found! No OTP needed");
      res.status(200).send(existPhone.phone);
      return;
    } else {
      // res.status(201).send(userPhone);
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const sendOTP = async (req, res, next) => {
  const KEY = process.env.SMS_API_KEY;
  const OTP = Math.floor(1000 + Math.random() * 9000);
  console.log(OTP);
  const MESSAGE = `Your OTP is ${OTP}`;
  const phone = req.body.phone;
  const URL = `https://api.sms.net.bd/sendsms?api_key=${KEY}&msg=${MESSAGE}&to=${phone}`;
  console.log(MESSAGE);

  try {
    const sendOtp = await axios.post(URL).then((res) => {
      const data = res.data;
      console.log(data);
    });
    res.status(201).json({
      message: `OTP পাঠানোর টাকা নাই! ${OTP} এইটা দিয়ে দেন!`,
      otp: `${OTP}`,
      phone: `${phone}`,
    });
  } catch (error) {
    console.log(error);
  }
  console.log(MESSAGE);
  console.log(phone);

  try {
    const savedOTP = new otp({ phone: phone, otp: OTP });
    await savedOTP.save();
    console.log("Saved to DB");
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const verifyRequest = req.body;
    const checkDB = await otp.findOne({
      phone: verifyRequest.phone,
      otp: verifyRequest.otp,
    });
    const dbData = checkDB;

    if (dbData === null) {
      res.status(404).json({ message: "OTP Invalid " });
    } else {
      res.status(200).send(dbData.otp);
    }
    console.log(dbData);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new user({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      otp: req.body.otp,
    });
    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
        isAdmin: newUser.isAdmin,
        phone: newUser.phone,
      },
      process.env.JWT
    );

    const { password, isAdmin, ...others } = newUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...others });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const alreadyUser = await user.findOne({ phone: req.body.phone });
    if (!alreadyUser) return next(createError(404, "User not found!"));
    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      alreadyUser.password
    );
    if (!passwordCorrect)
      return next(createError(400, "Wrong Password or Username!"));

    const token = jwt.sign(
      {
        id: alreadyUser._id,
        isAdmin: alreadyUser.isAdmin,
        phone: alreadyUser.phone,
      },
      process.env.JWT
    );

    const { password, isAdmin, ...others } = alreadyUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...others });
  } catch (error) {
    next(error);
  }
};

export const makePayment = async (req, res, next) => {
  try {
    const updatedPayment = await user.findOneAndUpdate(
      { phone: req.body.cus_phone },
      { $push: { enrolledCourses: req.body } },
      { new: true }
    );
    res.status(201).redirect("https://skillshikhun.vercel.app/dashboard");
  } catch (error) {
    next(error);
  }
};

export const cancelledPayment = async (req, res, next) => {
  try {
    const updatedCancelled = await user.findOneAndUpdate(
      { phone: req.body.cus_phone },
      { $push: { cancelledPayments: req.body } },
      { new: true }
    );
    res.status(201).redirect("https://skillshikhun.vercel.app/dashboard");
  } catch (error) {
    next(error);
  }
};
