const Blog = require("../models/Blog");

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {

    const { title, slug, content, metaTitle, metaDescription } = req.body;

    const blog = new Blog({
      title,
      slug,
      content,
      metaTitle,
      metaDescription,
    });

    await blog.save();

    res.json({
      message: "Blog created successfully",
      blog
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all blog posts
exports.getBlogs = async (req, res) => {
  try {

    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.json(blogs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get single blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {

    const blog = await Blog.findOne({ slug: req.params.slug });

    res.json(blog);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {

  try {

    const { title, slug, content, metaTitle, metaDescription } = req.body;

    const updateData = {
      title,
      slug,
      content,
      metaTitle,
      metaDescription,
    };


    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      message: "Blog updated successfully",
      blog
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



// DELETE BLOG
exports.deleteBlog = async (req, res) => {

  try {

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: "Blog deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};