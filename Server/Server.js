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


// LOGIN MODEL AND ROUTE
const UsersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]
});

const UsersModel = mongoose.model('Users', UsersSchema);

app.post('/create_user', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        //check if exists
        let existingUser = await UsersModel.findOne({ email: req.body.email });
        if (existingUser){
            return res.status(400).send({ error: 'Username or email already exists'})
        }
        //else we want to create a new user document into our database"
        let user = new UsersModel({ email: req.body.email,
                                    username: req.body.username,
                                    password: req.body.password });
        await user.save()
        res.status(201).send({ message: 'User successfully created!'});
    }

    catch(error){
        console.error(error);
        res.status(500).send({ error: 'Error creating user'});
    }
});

//user login endpoint
app.post('/login_user', async (req, res) => {
    try {
        const user = await UsersModel.findOne({ username: req.body.username });
        if (!user){
            return res.status(404).send ({error: 'Invalid username or password.'});
        }
        const Matching = await bcrypt.compare(req.body.password, user.password);
        if(!Matching){
            return res.status(400).send({ error: 'Invalid username or password.'});
        }
        //successful
        res.send({ message: 'Login successful' });
    } catch(error) {
        res.status(500).send({ error: 'Error logging in'});
    }
    });
// Hash password before saving
UsersSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

 
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

app.get('/posts', async (req, res) => { // server get for posts
    try {
        const posts = await Post.find({});
        res.status(200).json(posts); // Changed status code to 200 for successful GET
    } catch (error) {
        res.status(500).json({ message: error.message }); // Changed status code to 500 for server error
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Server running on port ${port}`);});