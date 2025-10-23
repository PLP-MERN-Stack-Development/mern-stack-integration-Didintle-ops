const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Post = require('../models/Post');

// @route GET /api/posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author category').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// @route POST /api/posts
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, slug, category } = req.body;
    const post = await Post.create({
      title,
      slug,
      content,
      category,
      author: req.user._id,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post' });
  }
});

module.exports = router;
