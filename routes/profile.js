const express = require("express"),
      User    = require("../models/user"),
      Campground = require("../models/campground")

var router = express.Router();
//goto the user profile page
router.get("/:current_user_id/profile", (req, res) => {
    User.findById(req.params.current_user_id, (err, foundUser) => {
        if (err) {
            req.flash("error", err.message);
        } else {
            Campground.find().where("author.id").equals(foundUser._id).exec((err, campgrounds) => {
                if (err) {
                    req.flash("error", err.message);
                } else {
                    res.render("profile/show", {foundUser: foundUser, campgrounds: campgrounds});
                }
            });
        }
    });
});
//     User.findById(req.params.current_user_id).populate("contents").exec((err, foundUser) =>{
//         if (err){
//             req.flash("error", err.message);
//         } else{
//             res.render("profile/show", {foundUser: foundUser});
//         }
//     });
// });

module.exports = router;