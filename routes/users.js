import express from 'express';

// Use npm package uuid to create unique id for users
import { v4 as uuidv4 } from 'uuid';

import { createUser, userId, updateUser } from '../controllers/users.js';

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

const deleteUser = (req, res) => {
  const { id } = req.params;

  // We use .filter() to single out the user(via id) that we want to delete
  // .filter() returns everything that is true and removes all that is false
  // This function keeps all users except for the one we're referring to
  // This will produce an error because 'import's are live read-only views on exported-values. You can the values but can only change them in their original file
  // This block of code will be left here functionality as 'users' are originally defined in this file
  // See: https://stackoverflow.com/questions/32558514/javascript-es6-export-const-vs-export-let#:~:text=To%20summarize%3A&text=If%20the%20variable%20is%20declared,import%20%2Ded%20variable%20changes%20accordingly.
  users = users.filter((user) => user.id !== id);

  res.send(`Users with the id ${id} has been deleted`);
};

// === === === === === === ROUTES === === === === === ===

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
