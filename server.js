const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');



dotenv.config();
const app = express();
app.use(express.json());
// Enable CORS
app.use(cors());

// Connect to MongoDB using Mongoose
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => { 
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define routes and middleware
const exercisesRouter = require('./routes/exercices.js');
const userRouter = require('./routes/user.js');

app.use('/exercise', exercisesRouter);
app.use('/users', userRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});