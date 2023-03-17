import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

//middlewares

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(cookieParser());
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Error Handler Middleware

app.use((err, req, res, next) => {
  const errorStatus = err.errorStatus || 500;
  const errorMessage = err.errorMessage || "Something Went Wrong!";

  if (req.accepts("json")) {
    res.setHeader("Content-Type", "application/json");
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  } else {
    res.send(`
    <html>
      <head>
        <title>Error</title>
      </head>
      <body>
        <h1>${err.status || 500} Error</h1>
        <pre>${err.message}</pre>
      </body>
    </html>
  `);
  }
});

//Verify Middleware

// app.use((req, res, next) => {
//   // if user exists? then show login else show auth
// });

app.use("/api", authRoute);

const PORT = process.env.PORT;

const connect = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to DB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
