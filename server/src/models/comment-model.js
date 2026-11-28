import promisePool from '../utils/database.js';

const findCommentsByProductId = async (productId) => {
  try {
    const sqlQuery = `
      SELECT
        c.comment_id,
        c.content,
        c.product_id,
        c.created_at,
        c.user_id,
        u.username,
        u.avatar
      FROM comments c
      JOIN users u ON c.user_id = u.user_id
      WHERE c.product_id = ?
      ORDER BY c.created_at ASC
    `;

    // array destructuring to get the 1st element of the array returned by promisePool.execute
    const [rows] = await promisePool.execute(sqlQuery, [productId]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addComment = async (comment) => {
  const {product_id, user_id, content} = comment;
  const sql = `
    INSERT INTO comments (product_id, user_id, content)
    VALUES (?, ?, ?)
  `;
  const params = [product_id, user_id, content];
  const [result] = await promisePool.execute(sql, params);
  if (result.affectedRows === 0) {
    return false;
  }
  return {comment_id: result.insertId};
};

const modifyComment = async (id, content, currentUser) => {
  if (!content) {
    return {error: 'Missing content'};
  }

  let sql = 'UPDATE comments SET content = ? WHERE comment_id = ?';
  const params = [content, id];

  if (currentUser.user_level !== 1) {
    sql += ' AND user_id = ?';
    params.push(currentUser.user_id);
  }

  try {
    const [result] = await promisePool.execute(sql, params);
    if (result.affectedRows === 0) {
      return false;
    }
    return {message: 'Comment updated', comment_id: Number(id)};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const deleteComment = async (id, currentUser) => {
  let sql = 'DELETE FROM comments WHERE comment_id = ?';
  const params = [id];

  if (currentUser.user_level !== 1) {
    sql += ' AND user_id = ?';
    params.push(currentUser.user_id);
  }

  try {
    const [result] = await promisePool.execute(sql, params);
    if (result.affectedRows === 0) {
      return false;
    }
    return {message: 'Comment deleted', comment_id: Number(id)};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {addComment, modifyComment, deleteComment, findCommentsByProductId};
