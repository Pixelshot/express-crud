// Making (req, res) callback into a constant for cleaner code

import { users } from '../routes/users.js';
import { v4 as uuidv4 } from 'uuid';

// === === === CREATE === === ===
export const createUser = (req, res) => {
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
};

// === === === RETRIEVE SPECIFIC USER === === ===
export const userId = (req, res) => {
  const { id } = req.params;

  // How to grab the specific user from our database
  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
};

// === === === UPDATE A USER === === ===
export const updateUser = (req, res) => {
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
};

// === === === DELETE A USER === === ===
// Can be found in original file
