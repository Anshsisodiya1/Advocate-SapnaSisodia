const express = require("express");
const router = express.Router();

const { loginAdmin, registerAdmin, checkAdminExists } = require("../controllers/authController");

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
router.get("/check", checkAdminExists);

module.exports = router;