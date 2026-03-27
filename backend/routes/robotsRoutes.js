const express = require("express");
const router = express.Router();

// GET /robots/ -> serves robots.txt
router.get("/", (req, res) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";

  res.type("text/plain");
  res.send(`
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap
  `);
});

module.exports = router;