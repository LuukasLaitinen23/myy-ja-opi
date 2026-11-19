import express from 'express';
import {getCommentsByProductId} from '../controllers/comment-controller.js';

const commentRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         comment_id:
 *           type: integer
 *           example: 1
 *         content:
 *           type: string
 *           example: Onko laskimessa paristot mukana?
 *         created_at:
 *           type: string
 *           format: date-time
 *         product_id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 2
 *         username:
 *           type: string
 *           example: laura_o
 *         avatar:
 *           type: string
 *           nullable: true
 *           example: user-svgrepo-com.svg
 */

/**
 * @swagger
 * /api/comments/product/{productId}:
 *   get:
 *     summary: Hakee yksittäisen tuotteen kommentit
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tuotteen ID
 *     responses:
 *       200:
 *         description: Lista tuotteen kommenteista
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
commentRouter.route('/product/:productId').get(getCommentsByProductId);

export default commentRouter;
