// const http = require("node:http");
import express from "express";

import mongoose from "mongoose";
import router from "./routes/index.js";
import cors from "cors";
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/test").then(() => {
  console.log("Connected");
});
app.use("/api", router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
