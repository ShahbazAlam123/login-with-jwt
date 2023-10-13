require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 8000;
const authRoute = require("./routes/auth");

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users", authRoute);

//mongodb connection and server startup
async function connectDB() {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    await mongoose.connect(process.env.MongoDBUri);
    console.log("mongodb connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
connectDB();
