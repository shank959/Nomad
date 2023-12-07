const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// create express app
const app = express();
//middleware pasrsing JSON bodies
app.use(cors());
app.use(express.json());
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Use Mongoose to connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://Nomad:ExploreLA123@clusternomad.l4pqavm.mongodb.net/test"
  )
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// LOGIN MODEL AND ROUTE
const UsersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "UsersModel" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    pfpURL: String,
});

const UsersModel = mongoose.model("Users", UsersSchema);

app.post("/create_user", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if user exists
    let existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ error: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user document in the database
    let user = new UsersModel({
      email,
      username,
      password: hashedPassword, // Store the hashed password
    });
    await user.save();
    res
      .status(201)
      .send({ message: "User successfully created!", userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error creating user" });
  }
});

//user login endpoint
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UsersModel.findOne({ username: req.body.username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Passwords match
      // Proceed with login logic (e.g., generating a token)
      res
        .status(201)
        .send({ message: "User successfully logged in!", userId: user._id });
    } else {
      // Passwords do not match or user does not exist
      res.status(401).send({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error logging in" });
  }
});
// Hash password before saving
UsersSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
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
  author: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "UsersModel",
    required: true,
  },
  likes: { type: Number, default: 0 },
});

const Post = mongoose.model("posts", postSchema);

app.post('/posts', async (req, res) => {
    const { imageUrl, caption, location, coordinates, author } = req.body;

    // Basic validation for required fields
    if (!imageUrl || !location || !coordinates) {
        return res.status(400).json({ message: 'Image, location, and coordinates are required' });
    }

    try {
        // Creating a new post with all fields
        const newPost = new Post({ imageUrl, caption, location, coordinates, author });

        // Saving the post to the database
        const savedPost = await newPost.save();

        // Updating the user document with the new post's ID
        await UsersModel.findByIdAndUpdate(author, {
            $push: { posts: savedPost._id }
        });

        // Sending response back with the saved post
        res.status(201).json(savedPost);
    } catch (error) {
        // Error handling for database operations
        res.status(500).json({ message: error.message });
    }
});


// search query endpoint
app.post("/search", async (req, res) => {
  try {
    // Update the query to match the structure of your UsersModel
    const users = await UsersModel.find({
      username: { $regex: req.body.query, $options: "i" },
    });
    res.json({ users });
  } catch (error) {
    res.status(500).send(error);
  }
});

/* app.get('/posts', async (req, res) => { // server get for posts
    try {
        const posts = await Post.find({});
        res.status(200).json(posts); // Changed status code to 200 for successful GET
    } catch (error) {
        res.status(500).json({ message: error.message }); // Changed status code to 500 for server error
    }
}); */

app.get('/posts', async (req, res) => {
    try {
        let posts = await Post.find({});

        // Fetch the usernames for each post's author
        posts = await Promise.all(posts.map(async (post) => {
            const user = await UsersModel.findById(post.author);
            return {
                ...post._doc,  // Spread the post document
                authorUsername: user ? user.username : 'Unknown'
            };
        }));

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/test", (req, res) => {
  console.log("Received data:", req.body);
  res.status(200).json({ message: "Data received successfully!" });
});

app.put('/update_profile', async (req, res) => {
    try {
        // Update the user's profile picture URL
        const { identity, profileUrl } = req.body;
        const updatedUser = await UsersModel.findByIdAndUpdate(identity, profileUrl, { new: true });

        // Respond with the updated user data or a success message
        res.status(200).json(updatedUser);
    } catch (error) {
        // Handle the error case
        console.error("Error updating profile picture:", error);
        res.status(500).json({ error: "Failed to update profile picture" });
    }
});

app.get("/get_profile_picture", async (req, res) => {
  try {
    const userId = req.query.userId;

    // Find the user by ID
    const user = await UsersModel.findById(userId);

    if (!user) {
      // User not found
      return res.status(404).json({ error: "User not found" });
    }

    // Return the profile picture URL
    res.status(200).json({ profileUrl: user.pfpURL });
  } catch (error) {
    console.error("Error getting profile picture:", error);
    res.status(500).json({ error: "Failed to get profile picture" });
  }
});

// POST ROUTE FOR POSTSPAGE
app.post('/users', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await UsersModel.findById(userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const userData = { posts: user.posts };
        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching user data' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
