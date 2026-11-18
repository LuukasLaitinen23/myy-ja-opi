import promisePool from '../utils/database.js';

// Get All products
const listAllProducts = async (limit) => {
  try {
    let sqlQuery = `SELECT p.product_id, p.title, p.price, p.city, c.name AS category_name, u.username AS seller
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      JOIN users u ON p.user_id = u.user_id
      WHERE p.is_sold = FALSE
      ORDER BY p.created_at DESC`;
    let result;
    if (limit) {
      result = await promisePool.execute(sqlQuery, [parseInt(limit, 10)]);
    } else {
      result = await promisePool.execute('SELECT * FROM products');
    }
    const [rows] = result;
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findProductById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM products WHERE product_id = ?',
      [id]
    );
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {listAllProducts};
