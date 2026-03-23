const express = require("express");
const router = express.Router();

const {getWhatsAppLink} = require("../controllers/whatsappController");

router.get("/",getWhatsAppLink);

module.exports = router;