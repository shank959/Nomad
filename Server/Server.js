const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoute = require('./models/postModel.js')

const uri = "mongodb+srv://Nomad:ExploreLA123@clusternomad.l4pqavm.mongodb.net/database/?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json())

// connect to the database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// connect the post route
app.use('api/posts', postRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

