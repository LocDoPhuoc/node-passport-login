const express = require("express");
const router = express.Router();
const { authenticated, guest } = require("../configs/auth");

router.get("/", guest,  (req, res) => {
    res.render("welcome");
});

router.get("/dashboard", authenticated, (req, res) => {
    res.render("dashboard", {
        name: req.user.name
    });
});

module.exports = router;