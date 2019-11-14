const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// Passport config
require("./configs/passport")(passport);

// Config public directory
app.use(express.static("public"));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "views");

// Body parser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

// Express middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));

app.listen(3000, console.log("Server is running at: http://127.0.0.1:3000"));
