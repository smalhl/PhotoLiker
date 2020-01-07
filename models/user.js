const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  userImg: String,
  userDes: String,
  // contents:[
  //     {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "Campground"
  //     }
  //   ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);