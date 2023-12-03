const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');

router.post('/api/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



  module.exports = router;
