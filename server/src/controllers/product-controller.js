import {listAllProducts} from '../models/product-model.js';

const getProducts = async (req, res) => {
  const result = await listAllProducts(req.query.limit);
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

export {getProducts};
