const express = require("express");
const app = express();
const ejs = require("ejs");

const req = require("express/lib/request");
const res = require("express/lib/response");

//connect to mongoDB

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/exampleDB")
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log("Connection failed.");
    console.log(err);
  });

//Define a schema,
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  major: String,
  scholarship: {
    merit: Number,
    other: Number,
  },
});
//create a model for students
const Student = mongoose.model("Student", studentSchema);

//update the value
Student.updateOne({ name: "Concordia Xu" }, { name: "Guanshaojie Xu" }).then(
  (meg) => {
    console.log(meg);
  }
);

Student.updateMany({ major: "EE" }, { major: "Electrical Enginnering" }).then(
  (meg) => {
    console.log(meg);
  }
);

//find the value
// Student.find({}).then((data) => {
//   console.log(data);
// });

//find the first one of the database
// Student.findOne({ name: "Concordia Xu" }).then((data) => {
//   console.log(data);
// });

//model mongo Shell
//create an object
// const Xu = new Student({
//   name: "Concordia Xu",
//   age: 25,
//   major: "BA",
//   scholarship: { merit: 2500, other: 1300 },
// });

//save Xu into database
// Xu.save()
//   .then(() => {
//     console.log("Concordia has been save in the database");
//   })
//   .catch((e) => {
//     console.log("error happend.");
//     console.log(e);
//   });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
