const express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware")


//goto comment add new page
router.get("/new", middleware.islogin, (req, res) =>{
    Campground.findById(req.params.id, (err, foundCamp) =>{
        if (err){
            console.log(err);
        } else{
            res.render("comments/new", {foundCamp: foundCamp});
        }
    });
});

//add new comment into database
router.post("/",middleware.islogin, (req, res) =>{
    Campground.findById(req.params.id, (err, editingCamp) =>{
        if (err){
            console.log(err);
        } else{
            Comment.create(req.body.comment, (err, comment) =>{
                if (err){
                    console.log(err);
                } else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //save comment
                    editingCamp.comments.push(comment);
                    editingCamp.save();
                    req.flash("success","Adding successfully!");
                    res.redirect("/home/" +editingCamp._id);
                }
            });
        }
    });
});

//goto edit comment page
router.get("/:comment_id/edit",middleware.checkCommentRight, (req, res) =>{
    Comment.findById(req.params.comment_id, (err, foundComment) =>{
       if (err){
           console.log(err);
       } else{
           res.render("comments/edit", {campground_id: req.params.id, foundComment:foundComment});
       }
    });
});

//update the edited comment into database
router.put("/:comment_id",middleware.checkCommentRight, (req, res) =>{
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err) =>{
      if (err){
          console.log(err);
      } else{
          res.redirect("/home/" + req.params.id);
      }
   });
});

//delete a comment
router.delete("/:comment_id",middleware.checkCommentRight, (req, res) =>{
   Comment.findByIdAndDelete(req.params.comment_id, (err) =>{
      if (err){
          console.log(err);
      } else{
          req.flash("success","Successflly delete!");
          res.redirect("/home/" + req.params.id);
      }
   });
});

module.exports = router;