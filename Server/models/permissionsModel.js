const mongoose = require("mongoose");

let permissionsSchema = mongoose.Schema;


let permission = new permissionsSchema({
  permissionName : String
});

module.exports = mongoose.model("permissions",permission)
