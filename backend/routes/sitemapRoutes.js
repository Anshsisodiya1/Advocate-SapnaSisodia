const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

router.get("/sitemap.xml", async (req, res) => {
  try {
    const blogs = await Blog.find();

    const baseUrl = process.env.BASE_URL || "http://localhost:5000";

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static Pages
    sitemap += `
<url>
<loc>${baseUrl}/</loc>
</url>

<url>
<loc>${baseUrl}/about</loc>
</url>

<url>
<loc>${baseUrl}/services</loc>
</url>

<url>
<loc>${baseUrl}/blog</loc>
</url>

<url>
<loc>${baseUrl}/contact</loc>
</url>
`;

    // Dynamic Blog Pages
    blogs.forEach((blog) => {
      sitemap += `
<url>
<loc>${baseUrl}/blog/${blog.slug}</loc>
<lastmod>${blog.updatedAt.toISOString()}</lastmod>
</url>
`;
    });

    sitemap += `</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;