const express = require("express");
const router = express.Router();
const { register, login, listUsers } = require("../controller/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/list", listUsers);

module.exports = router;
