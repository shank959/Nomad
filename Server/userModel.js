const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

//this lets us parse incoming request bodies in JSON format (this is like a middleman)
app.use(bodyParser.json());

const uri = "mongodb+srv://Nomad:ExploreLA123@clusternomad.l4pqavm.mongodb.net/Users?retryWrites=true&w=majority"
//connect to Users database
mongoose.connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error: ", err));

// User Schema
const UsersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// User Model
const UsersModel = mongoose.model('user_login', UsersSchema);

//Endpoint to create a new user - managing login
app.post('/Users', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        //check if exists
        const existingUser = await UsersModel.findOne({ $or: [{ username }, {email}]});
        if (existingUser){
            return res.status(409).send({ error: 'Username or email already exists'})
        }

        //else we want to create a new user document into our database"
        let user = new UsersModel({ email, username, password });
        await user.save()
        res.status(201).send({ message: 'User successfully created!'});
    }

    catch(error){
        console.error(error);
        res.status(500).send({ error: 'Error creating user'});
    }
});

//endpoint to check if a user exists
app.get('/check_user', async(req, res) => {
    try {
        const { username } = req.params;
        let user = await UsersModel.findOne({ username });
        if (user) {
            res.status(200).send({ exists: true});
        } else {
            res.status(404).send({ exists: false });
        }
    }
    catch (error){
        res.status(500).send({ error: 'Error checking user' });
    }
    });


//user login endpoint
app.post('/login_user', async (req, res) => {
    try {
        const { username, apssword } = req.body;
        let user = await UsersModel.findOne({ username });
        if (!user){
            return res.status(404).send ({error: 'User not found'});
        }
        const Matching = await bcrypt.compare(password, user.password);
        if(!Matching){
            return res.status(400).send({ error: 'Invalid credentials' });
        }
        res.status(200).send({ message: 'Login successful' });
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

module.exports = UsersModel;
