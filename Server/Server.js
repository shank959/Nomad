const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js')
const router = express.Router();


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

const Post = new mongoose.model('posts', postSchema);


app.post('/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});







app.use('/user', userRoutes)
app.use('/posts', postRoute)
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Server running on port ${port}`);});