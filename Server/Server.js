const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// create express app
const app = express();
//middleware pasrsing JSON bodies
app.use(cors());
app.use(express.json());


//Use Mongoose to connect to MongoDB
mongoose.connect("mongodb+srv://Nomad:ExploreLA123@clusternomad.l4pqavm.mongodb.net/test")
.then(() => {
    console.log("Connected to MongoDB...");
})
.catch(err => console.error("Could not connect to MongoDB...", err));


 
// POST MODEL AND ROUTE
const postSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    caption: { type: String, required: true },
    location: { type: String, required: true },
    coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    createdAt: { type: Date, default: Date.now },
    author: String, //FIXME
    //author: { type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true }, // CHECKOK
    likes: { type: Number, default: 0 },
});

const Post = mongoose.model('posts', postSchema);

app.post('/posts', (req, res) => {
    const { imageUrl, caption, location, coordinates, author } = req.body;
    // Basic validation for required fields
    if (!imageUrl || !location || !coordinates) {
        return res.status(400).json({ message: 'Image, location, and coordinates are required' });
    }
    // Creating a new post with all fields
    const newPost = new Post({
        imageUrl,
        caption,
        location,
        coordinates,
        author  // need to code the functionality of taking the users id as the author
    });
    // Saving the post to the database
    newPost.save()
        .then(savedPost => {
            // Sending response back with the saved post
            res.status(201).json(savedPost);
        })
        .catch(error => {
            // Error handling for database save errors
            res.status(500).json({ message: error.message });
        });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Server running on port ${port}`);});