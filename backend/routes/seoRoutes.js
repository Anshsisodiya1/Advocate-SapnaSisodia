const express = require("express");
const router = express.Router();

const {getSeo,updateSeo} = require("../controllers/seoController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:page",getSeo);

router.put("/:page",authMiddleware,updateSeo);

module.exports = router;