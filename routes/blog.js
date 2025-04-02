const { blogModel } = require("../db");
const { Router } = require("express");

const blogRoute = Router();

blogRoute.get("/", async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

blogRoute.get("/:id", async (req, res) => {
  try {
    const blog = await blogModel
      .findById(req.params.id)
      .populate("author", "username");
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blog" });
  }
});

module.exports = { blogRoute };
