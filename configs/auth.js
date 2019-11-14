module.exports = {
    authenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }

        req.flash("error_msg", "Please log in to view this resource");
        res.redirect("/user/login");
    },
    guest: function(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }

        req.flash("error_msg", "You are logged in");
        res.redirect("/dashboard");
    }
}