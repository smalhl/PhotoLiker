const express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user")

//goto intro page(begin page)
router.get("/", (req, res) =>{
    res.render("landing");
});

//show the register page
router.get("/register", (req, res) =>{
    res.render("register");
});

//handle the register action
router.post("/register",(req, res) =>{
    User.register(new User({username: req.body.username}), req.body.password, (err, user) =>{
        if (err){
            req.flash("error",err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, () =>{
            req.flash("success","Welcome to YelpCamp: " + user.username);
            res.redirect("/home");
        });
    });
});

//show the login page
router.get("/login", (req, res) =>{
    res.render("login");
});

//handle the login action
router.post("/login",passport.authenticate("local",{
    successRedirect: "/home",
    failureRedirect: "/login"
}), (req, res) =>{
});

//logout
router.get("/logout", (req, res) =>{
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/home");
});

module.exports = router;