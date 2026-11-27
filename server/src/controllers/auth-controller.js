import jwt from 'jsonwebtoken';
import {findUserByUsername} from '../models/user-model.js';
import 'dotenv/config';
import bcrypt from 'bcryptjs';

// User authentication controller functions
const postLogin = async (req, res, next) => {
  console.log('postLogin', req.body);
  const user = await findUserByUsername(req.body.username);
  if (!user) {
    const error = new Error('Invalid username or password');
    error.status = 401;
    return next(error);
  }
  // Compare the provided password with the hashed password stored in the database
  const match = await bcrypt.compare(req.body.password, user.password);
  //console.log('user found?', user);
  if (match) {
    // Remove the password from the user object before sending it in the response
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({...user, token});
  } else {
    const error = new Error('Invalid username or password');
    error.status = 401;
    return next(error);
  }
};

/**
 * Get user information based on token data
 * @param {*} req
 * @param {*} res
 */
const getMe = (req, res) => {
  res.json(req.user);
};

export {postLogin, getMe};
