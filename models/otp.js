import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    otp: { type: String, min: 4, max: 4 },
    expiresAt: { type: Date, default: Date.now, expires: "5m" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Otp", otpSchema);
