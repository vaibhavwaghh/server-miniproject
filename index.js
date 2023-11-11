const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const mongoURL =
  "mongodb+srv://vaibhavtester404:Chitra123@cluster0.e6w4bni.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const studentSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  college: String,
  email: String,
  division: String,
  review: String,
  year: Number,
});

const Student = mongoose.model("Student", studentSchema);

const createNewStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json({
      status: "success",
      tour: newStudent,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

app.use(express.json()); // Middleware to parse JSON in the request body
app.post("/", createNewStudent);

const port = 8500;

app.listen(port, "127.0.0.1", () => {
  console.log("Listening buddy");
});
