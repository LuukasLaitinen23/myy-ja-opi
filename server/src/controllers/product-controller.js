import {listAllProducts, findProductById} from '../models/product-model.js';

// Hakee kaikki tuotteet, joilla is_sold = false
const getProducts = async (req, res) => {
  const result = await listAllProducts(req.query.limit);
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

// Hakee yksittäisen tuotteen ID:llä
const getProductById = async (req, res) => {
  const product = await findProductById(req.params.id);
  if (!product) {
    res.sendStatus(404);
    return;
  }
  if (product.error) {
    res.status(500).json(product);
    return;
  }
  res.json(product);
};

export {getProducts, getProductById};
