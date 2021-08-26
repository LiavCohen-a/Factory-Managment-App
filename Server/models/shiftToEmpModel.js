const mongoose = require("mongoose");

let shiftToEmpSchema = mongoose.Schema;


let shiftToEmp = new shiftToEmpSchema({
  shiftID : String,
  employeeID : String,
});

module.exports = mongoose.model("shiftToEmployees",shiftToEmp)
