// make sure "type": "module" is in package.json
import express from 'express';
// Previously
// const express = require('express');

// This bodyParser middleware allows us to take in incoming post-request body/bodies
import bodyParser from 'body-parser';

import usersRoute from './routes/users.js';

// Our whole operation lies in this app constant
const app = express();
const PORT = 5000;

// This is just to let the app know that we're using json data in our application
app.use(bodyParser.json());

// Setting up all paths for users
app.use('/users', usersRoute);

// Listen for incoming requests
app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost:${PORT}`)
);

// Express is all about routing
app.get('/', (req, res) => res.send('Hello from Homepage!'));
