const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes.js')

const app = express()
//middleware parsing JSON bodies
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


//Use Mongoose to connect to MongoDB
mongoose.connect("mongodb://localhost:27017/database")
.then(() => {
    console.log("Connected to MongoDB...");
    //insertUsers()
})
.catch(err => console.error("Could not connect to MongoDB...", err));

//prefix routes defined in userRoutes.js with '/user'
app.use('/user', userRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log('Server running on port ${port}');});