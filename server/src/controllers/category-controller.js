import {listAllCategories} from '../models/category-model.js';

const getCategories = async (req, res) => {
  const result = await listAllCategories();
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
};

export {getCategories};
