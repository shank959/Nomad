const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const UsersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
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
