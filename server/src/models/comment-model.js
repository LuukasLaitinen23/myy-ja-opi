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

export {findCommentsByProductId};
