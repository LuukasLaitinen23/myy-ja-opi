import express from 'express';
import {getCategories} from '../controllers/category-controller.js';

const categoryRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         category_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Kurssikirjat & opiskelutarvikkeet
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Hakee kaikki tuotekategoriat
 *     responses:
 *       200:
 *         description: Lista kategorioista
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
categoryRouter.route('/').get(getCategories);

export default categoryRouter;
