const mongoose = require("mongoose");

let shiftSchema = mongoose.Schema;


let shift = new shiftSchema({
  date : String,
  startTime : String,
  endTime : String
});

module.exports = mongoose.model("shifts",shift)
