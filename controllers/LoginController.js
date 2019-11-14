const User = require("../models/User");
const passport = require("passport");

class LoginController {
    index(req, res){
        res.render("../views/login");
    }
    login(req, res, next){
        passport.authenticate('local', {
            successRedirect: "/dashboard",
            failureRedirect: "/user/login",
            failureFlash: true
        })(req, res, next);
    }
    logout(req, res){
        req.logout();
        req.flash("success_msg", "You are logged out");
        res.redirect("/user/login");
    }
}

module.exports = LoginController;