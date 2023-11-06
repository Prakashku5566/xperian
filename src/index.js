import express from "express";
import dotenv from "dotenv";
import router from "./routes/hrRoute.js";
import mongoose from "mongoose";
const app = express();

// const multer = require("multer")

app.use(express.json());

// app.use(multer().any());
dotenv.config();

mongoose
  .connect(
    "mongodb+srv://Madhuri9988:qkqCkGvAjbIv4Sv7@cluster0.stqyao7.mongodb.net/Xperian",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log("mongoose connection error", err));

// app.use('/api/hr', router);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use((req, res) => {
  var err = new Error("Not Found");
  err.status = 404;
  return res.status(404).send({ status: "404 ", msg: "Path not found" });
});

app.listen(3001, () => {
  console.log(`Server running on port 3001`);
});
