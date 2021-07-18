const express = require('express');
const router = express.Router();

const User = require('../../models/Users');

// Password handler
const bcrypt = require("bcrypt");

// @route GET api/users
// @desc Get all users
// @access Public

router.get('/', (req, res) => {
     User.find()
        .then(users => res.json(users))
})

// @route POST api/signup
// @desc Create a user
// @access Public

// Signup
router.post('/signup', (req, res) => {
    let { name, email, password, dateOfBirth } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();
  
    if (name == "" || email == "" || password == "" || dateOfBirth == "") {
      res.json({
        status: "FAILED",
        message: "Please fill in all fields",
      });
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      res.json({
        status: "FAILED",
        message: "Invalid full name entered",
      });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      res.json({
        status: "FAILED",
        message: "Invalid email address entered",
      });
    } else if (!new Date(dateOfBirth).getTime()) {
      res.json({
        status: "FAILED",
        message: "Invalid date of birth entered",
      });
    } else if (password.length < 8) {
      res.json({
        status: "FAILED",
        message: "Password is too short",
      });
    } else {
      // Checking if user already exists
      User.find({ email })
        .then((result) => {
          if (result.length) {
            // A user already exists
            res.json({
              status: "FAILED",
              message: "User with the provided email address already exists",
            });
          } else {
            // Try to create new user
  
            // password handling
            const saltRounds = 10;
            bcrypt
              .hash(password, saltRounds)
              .then((hashedPassword) => {
                const newUser = new User({
                  name,
                  email,
                  password: hashedPassword,
                  dateOfBirth,
                });
  
                newUser
                  .save()
                  .then((result) => {
                    res.json({
                      status: "SUCCESS",
                      message: "Sign up successful",
                      data: result,
                    });
                  })
                  .catch((err) => {
                    res.json({
                      status: "FAILED",
                      message: "An error occurred while saving user account",
                    });
                  });
              })
              .catch((err) => {
                res.json({
                  status: "FAILED",
                  message: "An error occurred while hashing password",
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.json({
            status: "FAILED",
            message: "An error occurred while checking for existing user",
          });
        });
    }
  });
  
  // Signin
  router.post('/signin', (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
  
    if (email == "" || password == "") {
      res.json({
        status: "FAILED",
        message: "Empty credentials supplied",
      });
    } else {
      // Check if user exist
      User.find({ email })
        .then((data) => {
          if (data.length) {
            // User exists
  
            const hashedPassword = data[0].password;
            bcrypt
              .compare(password, hashedPassword)
              .then((result) => {
                if (result) {
                  // Password match
                  res.json({
                    status: "SUCCESS",
                    message: "Sign in successful",
                    data: data,
                  });
                } else {
                  res.json({
                    status: "FAILED",
                    message: "Invalid password entered",
                  });
                }
              })
              .catch((err) => {
                res.json({
                  status: "FAILED",
                  message: "An error occurred while comparing passwords",
                });
              });
          } else {
            res.json({
              status: "FAILED",
              message: "Invalid credentials entered",
            });
          }
        })
        .catch((err) => {
          res.json({
            status: "FAILED",
            message: "An error occurred while checking for existing user",
          });
        });
    }
  });
  
  module.exports = router;