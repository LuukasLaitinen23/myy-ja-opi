import express from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import {body, param} from 'express-validator';
import {validationErrors} from '../middlewares/error-handler.js';
import {authenticateToken} from '../middlewares/authentication.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    body('email').trim().isEmail().normalizeEmail(),
    validationErrors,
    postUser
  );

userRouter
  .route('/:id')
  .get(param('id').isInt(), validationErrors, getUserById)
  .put(
    authenticateToken,
    param('id').isInt(),
    body('username')
      .optional()
      .trim()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('password').optional().trim().isLength({min: 8}),
    body('email').optional().trim().isEmail().normalizeEmail(),
    validationErrors,
    putUser
  )
  .delete(authenticateToken, param('id').isInt(), validationErrors, deleteUser);

export default userRouter;
