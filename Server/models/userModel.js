const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

//this lets us parse incoming request bodies in JSON format (this is like a middleman)
app.use(bodyParser.json());

// User Schema
const UsersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]
}, {
    collection: 'Users'
});

// Hash password before saving
UsersSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// User Model
const UsersModel = mongoose.model('Users', UsersSchema);

module.exports = UsersModel;
