import express from 'express';

// Use npm package uuid to create unique id for users
import { v4 as uuidv4 } from 'uuid';

// Using express's Router function for our get request
const router = express.Router();

let users = [
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
router.post('/', (req, res) => {
  console.log('POST ROUTE REACHED!');

  // Adding new user to the database. In our example it's just a simple array(users)
  const user = req.body;

  // Insert id to user
  users.push({ ...user, id: uuidv4() });

  console.log(users);
  // What client side will see
  res.send(
    `User with the name ${user.firstName} has been added to the database!`
  );
});

// To retrieve a specific user, we use params
// Eg: /users/2 => req.params { id: 2 }

router.get('/:id', (req, res) => {
  const { id } = req.params;

  // How to grab the specific user from our database
  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
});

// There are two ways to edit/update a user
// 1. PUT - This will completely override data of the user
// 2. PATCH - To apply partial modification

// 2. PATCH
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  // These are coming from Postman where we manually update the user
  const { firstName, lastName, age } = req.body;

  // Getting the specific user using id
  const user = users.find((user) => user.id === id);

  // Using if statement to insert the new updates
  // Normal syntax
  // if (firstName) {
  //   user.firstName = firstName;
  // }

  // Shorthand syntax
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;

  res.send(`User with id ${id} has been updated`);
});

// Deleting a specific user
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // We use .filter() to single out the user(via id) that we want to delete
  // .filter() returns everything that is true and removes all that is false
  // This function keeps all users except for the one we're referring to
  users = users.filter((user) => user.id !== id);

  res.send(`Users with the id ${id} has been deleted`);
});

export default router;
