const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const UsersModel = require('./models/userModel.js');


//Endpoint to create a new user - managing login
router.post('/create_user', async (req, res) => {
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
router.post('/login_user', async (req, res) => {
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

// search query endpoint
router.post('/search', async (req, res) => {
    try {
        // Update the query to match the structure of your UsersModel
        const users = await UsersModel.find({ 
            username: { $regex: req.body.query, $options: 'i' } 
        });
        res.json({ users });
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router