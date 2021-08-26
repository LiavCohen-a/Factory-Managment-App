const mongoose = require("mongoose");

let departmentSchema = mongoose.Schema;


let department = new departmentSchema({
   departmentName : String,
   departmentManagerID : String
});

module.exports = mongoose.model("departments",department)
