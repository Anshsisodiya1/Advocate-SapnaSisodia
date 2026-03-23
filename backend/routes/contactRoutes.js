// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
  deleteContact // <-- make sure this is included
} = require("../controllers/contactController");

// Routes
router.post("/contact", createContact);
router.get("/all", getAllContacts);
router.delete("/delete/:id", deleteContact); // DELETE route

module.exports = router;