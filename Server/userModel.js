//defining the structure of our model
const mongoose = require('mongoose');

//to update API routes
//this directs API/HTTP requests to backend resources
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//create instance of express app
const app = express();

//setup port number - this is where we tell where the app to listen in
const PORt = process.env.PORT || 30000;

//implement Schema: This is a class that allows me to 
//define the structure of documents in database
const UsersSchema = new mongoose.Schema({
    email: {type: String, required:true},
    username: {type: String, required:true},
    password: {type: String, required:true}
});

const UsersModel = mongoose.model('Users', UsersSchema, 'user_login')
app.use(bodyParser.json());

//create endpoint: Creating a new user
app.post('/createusers', async (req, res) => {
    try {
        const {email, username, password } = req.body;
        }
    catch (error){
        console.error(error);
    }
    });
