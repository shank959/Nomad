const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     imageUrl: String,
//     caption: String,
//     location: String,
//     createdAt: Date.now
//     author: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
//     likes: { type: Number, default: 0 },
//     comments: { type: Number, default: 0 }
// });

const postSchema = new mongoose.Schema({
    caption: String,
});

const Post = new mongoose.model('posts', postSchema);

module.exports = Post;