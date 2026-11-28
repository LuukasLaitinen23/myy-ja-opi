import {
  listAllProducts,
  findProductById,
  addProduct,
  modifyProduct,
  deleteProduct as removeProduct,
} from '../models/product-model.js';

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

const postProduct = async (req, res, next) => {
  try {
    const newProduct = {
      ...req.body,
      user_id: req.user.user_id,
      image: req.file ? req.file.filename : 'default_product.png',
    };

    const result = await addProduct(newProduct);
    if (!result) {
      const error = new Error('Tuotteen lisääminen epäonnistui');
      error.status = 400;
      return next(error);
    }

    res.status(201).json({
      message: 'Uusi tuote lisätty',
      result,
    });
  } catch (error) {
    next(error);
  }
};

const putProduct = async (req, res, next) => {
  try {
    const updatedProduct = {
      ...req.body,
      ...(req.file && {image: req.file.filename}),
    };

    const result = await modifyProduct(req.params.id, updatedProduct, req.user);
    if (!result) {
      const error = new Error('Product not found or unauthorized');
      error.status = 404;
      return next(error);
    }
    if (result.error) {
      const error = new Error(result.error);
      error.status = 400;
      return next(error);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const result = await removeProduct(req.params.id, req.user);
    if (!result) {
      const error = new Error('Product not found or unauthorized');
      error.status = 404;
      return next(error);
    }
    if (result.error) {
      const error = new Error(result.error);
      error.status = 400;
      return next(error);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export {getProducts, getProductById, postProduct, putProduct, deleteProduct};
