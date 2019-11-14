const User = require("../models/User");
const bcrypt = require('bcryptjs');

class RegisterController {
    index(req, res){
        res.render("../views/register");
    }
    async register(req, res){
        const { name, email, password, password2 } = req.body;
        let errors = [];

        // Check require fields
        if(!name || !email || !password || !password2){
            errors.push({ msg: "Please fill in all fields" });
        }

        // Check password match
        if(password != password2){
            errors.push({ msg: "Password is not match" });
        }

        // Check password length
        if(password.length < 8){
            errors.push({ msg: "Password should be at least 8 characters" });
        }

        if(errors.length > 0) {
            res.render("../views/register", { errors, name, email, password, password2 });
        }
        else{
            let user = await User.findOne({ where: {email: email} });
            if(user){
                errors.push({ msg: "Email is unique" });
                res.render("../views/register", { errors, name, email, password, password2 });
            }
            else{
                // Hash password
                var salt = bcrypt.genSaltSync(10);
                var hashPassword = bcrypt.hashSync(password, salt);

                user = await User.create({ name: name, email: email, password: hashPassword });
                // console.log(user);
                req.flash("success_msg", "You are registered and can login");
                res.redirect("/user/login");
            }
        }
    }
}

module.exports = RegisterController;