import promisePool from '../utils/database.js';

// Get All products
const listAllProducts = async (limit) => {
  try {
    let result;
    if (limit) {
      result = await promisePool.execute('SELECT * FROM products LIMIT ?', [
        parseInt(limit, 10),
      ]);
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
