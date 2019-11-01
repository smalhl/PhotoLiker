const Campground = require("../models/campground"),
      Comment = require("../models/comment")


var middlewareObj = {};

middlewareObj.checkCampgroundRight = function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, (err, foundCampground) =>{
                if (err){
                    res.redirect("back");
                } else{
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error","You don't have permission to do that!");
                        res.redirect("back");
                    }
                }
            });
        } else{
            req.flash("error","You need to login first!");
            res.redirect("back");
        }
};


middlewareObj.checkCommentRight = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) =>{
            if (err){
                res.redirect("back");
            } else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error","You need to login first!");
        res.redirect("back");
    }
};


middlewareObj.islogin = function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "Please Login First!");
        res.redirect("/login");
};


module.exports = middlewareObj;