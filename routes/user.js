const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController");
const RegisterController = require("../controllers/RegisterController");
const { authenticated, guest } = require("../configs/auth");

const loginController = new LoginController();
const registerController = new RegisterController();

// Login page
router.get("/login", guest, loginController.index);
// Login handle
router.post("/login", loginController.login);

// Logout handle
router.get('/logout', loginController.logout);

// Register page
router.get("/register", guest, registerController.index);
// Register handle
router.post("/register", registerController.register);

module.exports = router;