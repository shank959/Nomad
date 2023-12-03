//Connect to our Cluster
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes')

const app = express()

//middleware pasrsing JSON bodies
app.use(bodyParser.json());

//Use Mongoose to connect to MongoDB
mongoose.connect("mongodb+srv://Nomad:ExploreLA123@clusternomad.l4pqavm.mongodb.net/database?retryWrites=true&w=majority")
.then(() => console.log("Connected to MongoDB..."))
.catch(err => console.error("Could not connect to MongoDB...", err));


app.use('/user', userRoutes)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server running on port ${port}...');
});
