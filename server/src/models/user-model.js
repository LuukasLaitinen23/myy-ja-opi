import promisePool from '../utils/database.js';

const listAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Users');
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findUserById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM users WHERE user_id = ?',
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findUserByUsername = async (username) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addUser = async (user) => {
  const {first_name, last_name, username, password, email, user_level} = user;
  // Jos user_level jätetään antamatta, asetetaan oletukseksi peruskäyttäjä (2)
  const levelId = user_level || 2;
  const sql = `INSERT INTO users (first_name, last_name, username, password, email, user_level)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    first_name || null,
    last_name || null,
    username,
    password,
    email,
    levelId,
  ];
  try {
    const [result] = await promisePool.execute(sql, params);
    return {user_id: result.insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const modifyUser = async (id, user, currentUser) => {
  const {username, password, email} = user;
  if (!username || !password || !email) {
    return {error: 'Missing required fields'};
  }

  const sql = `UPDATE users SET last_name = ?, first_name = ? ,username = ?, password = ?, email = ?
               WHERE user_id = ?`;
  const params = [
    user.last_name || null,
    user.first_name || null,
    username,
    password,
    email,
    id,
  ];

  // Check if the current user is an admin (user_level_id = 1)
  if (currentUser.user_level !== 1) {
    sql += ' AND user_id = ?';
    params.push(currentUser.user_id);
  }

  try {
    const [result] = await promisePool.execute(sql, params);
    if (result.affectedRows === 0) {
      return false;
    }
    return {message: 'User updated', user_id: id};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const deleteUser = async (id, currentUser) => {
  // If the user is not an admin, only allow deletion of their own user information
  if (currentUser.user_level !== 1) {
    if (currentUser.user !== Number(id)) {
      return {error: 'You are not allowed to delete this user'};
    }
  }

  const sql = 'DELETE FROM users WHERE user_id = ?';
  try {
    const [result] = await promisePool.execute(sql, [id]);
    if (result.affectedRows === 0) {
      return false;
    }
    return {message: 'User deleted', user_id: id};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {
  listAllUsers,
  findUserById,
  findUserByUsername,
  addUser,
  modifyUser,
  deleteUser,
};
