const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userModel = require('../models/user.models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register',
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').trim().isEmail().isLength({ min: 13 }).withMessage('Enter a valid email (minimum 13 characters)'),
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {
    const errors = validationResult(req);

    // Validation Error Check
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        message: 'Invalid Data'
      });
    }

    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Hash the password
      const hashpassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await userModel.create({
        username,
        email,
        password: hashpassword
      });

      // Respond with success message
      res.status(201).json({
        message: 'User Registered Successfully',
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);


router.get('/login',(req,res)=>{
  res.render('login')
});

router.post('/login',
  body('username').trim().isLength({min:3}),
  body('password').trim().isLength({min:6}),
  async (req,res)=>{
    const error = validationResult(req);

    if(!error.isEmpty()){
      res.status(400).json({
        error : error.array(),
        message : 'Invalid data'
      })
    }

    try{
      const {username, password} = req.body;
      const user = await userModel.findOne({
        username: username
      })
      if(!user){
        res.status(400).json({
          message : 'Username or Password is incorrect'
        })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch){
        res.status(400).json({
          message : 'Username or Password is incorrect'
        })
      }

        const token = jwt.sign({
          userId: user._id,
          email: user.email,
          username : user.username
        },process.env.JWT_SECRET)

        res.cookie('token',token)
        
        // res.send('Logged In')
        res.redirect('/')

    }catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }


})

module.exports = router;
