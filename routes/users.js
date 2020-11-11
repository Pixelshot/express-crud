import express from 'express';

// Use npm package uuid to create unique id for users
import { v4 as uuidv4 } from 'uuid';

import {
  createUser,
  userId,
  updateUser,
  deleteUser,
} from '../controllers/users.js';

// Using express's Router function for our get request
const router = express.Router();

export let users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    id: uuidv4(),
  },
  {
    firstName: 'Barry',
    lastName: 'Allen',
    age: 32,
    id: uuidv4(),
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    age: 22,
    id: uuidv4(),
  },
];

// All routes in here are already starting with '/users'. This setup can be found in index.js
router.get('/', (req, res) => {
  console.log(users);
  res.send(users);
});

// Functionality of adding new user to the database
// Since browsers can only make .get() requests, we need to use a different software/application to handle/view all of our requests
// .post() will be declared here but the rest will be written on postman
router.post('/', createUser);

// To retrieve a specific user, we use params
// Eg: /users/2 => req.params { id: 2 }

router.get('/:id', userId);

// There are two ways to edit/update a user
// 1. PUT - This will completely override data of the user
// 2. PATCH - To apply partial modification

// 2. PATCH
router.patch('/:id', updateUser);

// Deleting a specific user
router.delete('/:id', deleteUser);

export default router;
