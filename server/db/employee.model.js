// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  present: Boolean,
  equipment: String,
  experience: Number,
  starting_date: String,
  current_salary: Number,
  desired_salary: Number,
  fav_color: String,
  kittens: [
    {
    name: String,
    weight: String
  },
  
],
  created: {
    type: Date,
    default: Date.now,
  },
});
//starting date, current salary, favourite color and desired salary.

module.exports = mongoose.model("Employee", EmployeeSchema);
