import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/product-controller.js';

const productRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         product_id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Tekniikan kaavasto & TI-84 Plus
 *         price:
 *           type: number
 *           format: float
 *           example: 45.00
 *         city:
 *           type: string
 *           example: Espoo
 *         category_name:
 *           type: string
 *           example: Kurssikirjat & opiskelutarvikkeet
 *         seller:
 *           type: string
 *           example: mattim
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Hakee kaikki myynnissä olevat tuotteet
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Palautettavien tuotteiden enimmäismäärä
 *     responses:
 *       200:
 *         description: Lista tuotteista
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

productRouter.route('/').get(getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Hakee yksittäisen tuotteen ID:llä
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tuotteen ID
 *     responses:
 *       200:
 *         description: Tuotteen tiedot
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Tuotetta ei löydy
 */
productRouter.route('/:id').get(getProductById);

export default productRouter;
