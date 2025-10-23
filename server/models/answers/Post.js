// models/Post.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
