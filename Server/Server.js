const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UsersModel = require('./userModel.js'); // Adjust the path according to your project structure

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware to parse request bodies
app.use(bodyParser.json());

// MongoDB connection URI
const uri = "mongodb+srv://Nomad: ExploreLA123@clusternomad. 14pqavm. mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// Define routes
// Example: app.use('/users', userRoutes); // Assuming you have user routes defined in userModel.js or another file

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
