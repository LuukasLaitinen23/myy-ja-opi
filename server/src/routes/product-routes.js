import express from 'express';
import {
  getProducts,
  getProductById,
  postProduct,
} from '../controllers/product-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {upload, createThumbnail, convertToPng} from '../middlewares/upload.js';

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

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Luo uuden myynti-ilmoituksen (vaatii kirjautumisen)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category_id
 *               - condition
 *               - description
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: Kitaravahvistin
 *               category_id:
 *                 type: integer
 *                 example: 4
 *               event_id:
 *                 type: integer
 *                 example: 1
 *               condition:
 *                 type: integer
 *                 example: 2
 *               description:
 *                 type: string
 *                 example: Hyväkuntoinen harjoitusvahvistin.
 *               price:
 *                 type: number
 *                 example: 55.00
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               street_address:
 *                 type: string
 *                 example: Otakaari 1
 *               city:
 *                 type: string
 *                 example: Espoo
 *               postal_code:
 *                 type: string
 *                 example: 02150
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tuote luotu onnistuneesti
 *       401:
 *         description: Kirjautuminen vaaditaan
 */

productRouter
  .route('/')
  .get(getProducts)
  .post(authenticateToken, upload.single('image'), convertToPng, postProduct);

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
