const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// CREATE BLOG (Admin Only)
router.post("/create", authMiddleware, upload.single("image"), createBlog);

// GET ALL BLOGS
router.get("/", getBlogs);

// GET BLOG BY SLUG
router.get("/:slug", getBlogBySlug);
// UPDATE BLOG
router.put("/update/:id", authMiddleware, upload.single("image"), updateBlog);


// DELETE BLOG
router.delete("/delete/:id", authMiddleware, deleteBlog);

module.exports = router;
