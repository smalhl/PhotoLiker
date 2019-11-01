const express      = require("express"),
      app          = express(),
      bodyParser   = require("body-parser"),
      mongoose     = require("mongoose"),
      passport     = require("passport"),
      localStrategy= require("passport-local"),
      User         = require("./models/user"),
      methodOverride = require("method-override"),
      flash        = require("connect-flash"),

      CampgroundRoutes = require("./routes/campground"),
      CommentsRoutes = require("./routes/comments"),
      IndexRoutes = require("./routes/index")

//mongoose.connect("mongodb://localhost:27017/yelpCamp", {useNewUrlParser:true, useUnifiedTopology: true});
mongoose.connect('mongodb+srv://samxiao:Qwaszx7845129630@cluster0-uqalu.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true, useCreateIndex: true}).then(() =>{
            console.log("Connected to Atlas");
}).catch(err =>{
    console.log(err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());


//passport configuration
app.use(require("express-session")({
    secret: "Find a job is my goal",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/home", CampgroundRoutes);
app.use("/home/:id/comment", CommentsRoutes);
app.use(IndexRoutes);

//listen to the port
// app.listen(3000, () => {
//     console.log('server listening on port 3000');
// });

var port = process.env.PORT || 3000;
app.listen(port, () =>{
   console.log("Server Has Been Started!")
});