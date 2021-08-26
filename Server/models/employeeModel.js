const mongoose = require("mongoose");

let employeeSchema = mongoose.Schema;


let employee = new employeeSchema({
  firstName : String,
  lastName : String,
  startWorkYear : Date,
  department : String
});

module.exports = mongoose.model("employees",employee)
