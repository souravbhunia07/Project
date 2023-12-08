const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDatabase = require("./config/database.js");
const errorMiddleWare = require("./middleware/error");
const cloudinary = require("cloudinary");
const cors = require("cors");

// Config
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Route Imports
const user = require("./routes/userRoutes");
const events = require("./routes/eventRoutes.js");

app.use("/api/v1", user);
app.use("/api/v1", events);

// Middlewares for Error
app.use(errorMiddleWare);

// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
