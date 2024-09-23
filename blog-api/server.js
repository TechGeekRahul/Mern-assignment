const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern_assignment', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// CRUD API Routes

// 1. Create a new blog post
app.post('/posts', async (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new BlogPost({ title, content, author });
  await newPost.save();
  res.json(newPost);
});

// 2. Get all blog posts
app.get('/posts', async (req, res) => {
  const posts = await BlogPost.find();
  res.json(posts);
});

// 3. Get a single blog post by ID
app.get('/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// 4. Update a blog post by ID
app.put('/posts/:id', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true, runValidators: true }
    );
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// 5. Delete a blog post by ID
app.delete('/posts/:id', async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (deletedPost) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
