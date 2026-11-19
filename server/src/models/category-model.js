import promisePool from '../utils/database.js';

const listAllCategories = async () => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT category_id, name FROM categories'
    );
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {listAllCategories};
