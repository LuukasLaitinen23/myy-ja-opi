import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
  deleteUser as deleteUserModel,
} from '../models/user-model.js';

const getUsers = async (req, res, next) => {
  const result = await listAllUsers();
  if (!result.error) {
    res.json(result);
  } else {
    const error = new Error(result.error);
    error.status = 500;
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  const user = await findUserById(req.params.id);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }
  if (user.error) {
    const error = new Error(user.error);
    error.status = 500;
    return next(error);
  }
  res.json(user);
};

const postUser = async (req, res, next) => {
  const {username, password, email} = req.body;
  if (username && password && email) {
    const result = await addUser(req.body);
    if (result.user_id) {
      res.status(201).json({message: 'New user added.', ...result});
    } else {
      const error = new Error('Failed to add user');
      error.status = 500;
      return next(error);
    }
  } else {
    const error = new Error('Missing required fields');
    error.status = 400;
    return next(error);
  }
};

// Modify user information (PUT /api/users/:id)
const putUser = async (req, res, next) => {
  const {username, password, email} = req.body;
  if (!username || !password || !email) {
    const error = new Error('Missing required fields');
    error.status = 400;
    return next(error);
  }
  const result = await modifyUser(req.params.id, req.body, req.user);
  if (!result) {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }
  if (result.error) {
    const error = new Error(result.error);
    error.status = 500;
    return next(error);
  }
  res.json(result);
};

const deleteUser = async (req, res, next) => {
  const result = await deleteUserModel(req.params.id, req.user);
  if (!result) {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }
  if (result.error) {
    const error = new Error(result.error);
    error.status = 500;
    return next(error);
  }
  res.json(result);
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
