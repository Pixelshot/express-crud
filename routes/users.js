import express from 'express';

// Using express's Router function for our get request
const router = express.Router();

const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    age: 24,
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
  users.push(user);

  console.log(users);
  // What client side will see
  res.send(
    `User with the name ${user.firstName} has been added to the database!`
  );
});

export default router;
