const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const app = express();

const password = encodeURIComponent(process.env.MONGODB_SECRET);

const connectDB = async () => {
  try {
    const conn =
      await mongoose.connect(`mongodb+srv://waseem97:${password}@cluster0.piwg9n8.mongodb.net/Users?retryWrites=true&w=majority
    `);
    console.log(`Mongo db connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/api", [authRoutes]);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Started on Port: ${port}`);
});
