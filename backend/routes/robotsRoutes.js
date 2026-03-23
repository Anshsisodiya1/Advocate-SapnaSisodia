const express = require("express");
const router = express.Router();

router.get("/robots.txt", (req, res) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";

  res.type("text/plain");

  res.send(`
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
  `);
});

module.exports = router;