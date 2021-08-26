const mongoose = require("mongoose");

let userSchema = mongoose.Schema;


let user = new userSchema({
  userName: String,
  fullName : String,
  password : String,
  permissions : Array,
  isAdmin : Boolean
});

module.exports = mongoose.model("users",user)
