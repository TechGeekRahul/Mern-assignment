const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern_assignment', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

// Insert a new user into the collection
const newUser = new User({
  name: 'David',
  email: 'david@example.com',
  age: 28
});

newUser.save()
  .then(() => console.log('User inserted'))
  .finally(() => mongoose.connection.close());
