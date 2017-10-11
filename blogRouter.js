const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create('30 Things to Do Before 30', 'blog post content here', 'Jane Doe');
BlogPosts.create('How to Start a New Career', 'blog post content here', 'Overa Cheever');
BlogPosts.create('What Financial Advice Millienials Should be Following (But Aren\'t...YOLO)', 'blog post content here', 'Cool Dad Accountant');

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
  });

  router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    const item = BlogPosts.create(
        req.body.title, req.body.content, req.body.author);
    res.status(201).json(item);
  });

  