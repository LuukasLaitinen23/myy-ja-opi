import express from 'express';
import {getProducts} from '../controllers/product-controller.js';

const productRouter = express.Router();

productRouter.route('/').get(getProducts);

export default productRouter;
