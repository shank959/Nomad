//defining the structure of our model
const mongoose = require('mongoose');

//implement Schema: This is a class that allows me to 
//define the structure of documents in database
const UsersSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
});

const UsersModel = mongoose.model('Users', UsersSchema, 'user_login')
module.exports = UsersModel;

//to update API routes
//this directs API/HTTP requests to backend resources

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//create instance of express app
const app = express();

//setup port number - this is where we tell where the app to listen in
