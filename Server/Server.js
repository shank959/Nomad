const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express()
//middleware pasrsing JSON bodies
app.use(cors());
app.use(express.json());


//Use Mongoose to connect to MongoDB
mongoose.connect("mongodb+srv://Nomad:ExploreLA123@clusternomad.l4pqavm.mongodb.net/test")
.then(() => {
    console.log("Connected to MongoDB...");
    //insertUsers()
})
.catch(err => console.error("Could not connect to MongoDB...", err));

app.post('/test', (req, res) => {
    res.send('POST request to /test');
  });




  const postSchema = new mongoose.Schema({
    caption: String,
});

const Post = mongoose.model('posts', postSchema);


app.post('/posts', (req, res) => {
    // Validate request body
    if (!req.body.caption) {
        return res.status(400).json({ message: 'Caption is required' });
    }

    // Creating a new post
    const newPost = new Post({ caption: req.body.caption });

    // Saving the post to the database
    newPost.save()
        .then(savedPost => {
            // Sending response back
            res.status(201).json(savedPost);
        })
        .catch(error => {
            // Error handling
            res.status(500).json({ message: error.message });
        });
});









const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Server running on port ${port}`);});