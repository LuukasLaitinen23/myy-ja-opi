import express from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import {body, param} from 'express-validator';
import {validationErrors} from '../middlewares/error-handler.js';
import {authenticateToken} from '../middlewares/authentication.js';

const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           example: 1
 *         first_name:
 *           type: string
 *           example: Matti
 *         last_name:
 *           type: string
 *           example: Meikäläinen
 *         username:
 *           type: string
 *           example: mattim
 *         email:
 *           type: string
 *           example: matti@metropolia.fi
 *         user_level:
 *           type: integer
 *           description: 1 = Admin, 2 = Peruskäyttäjä
 *           example: 2
 *         avatar:
 *           type: string
 *           example: default_avatar.png
 *         created_at:
 *           type: string
 *           format: date-time
 *
 * /api/users:
 *   get:
 *     summary: Hakee kaikki käyttäjät
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista käyttäjistä
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Luo uuden käyttäjän
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password, email]
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Uusi käyttäjä luotu
 *       400:
 *         description: Virheellinen syöte tai puuttuvat kentät
 *
 * /api/users/{id}:
 *   get:
 *     summary: Hakee yksittäisen käyttäjän ID:llä
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Käyttäjän tiedot
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Käyttäjää ei löytynyt
 *   put:
 *     summary: Muokkaa käyttäjän tietoja (vain oma profiili tai admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password, email]
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Käyttäjän tiedot päivitetty
 *       401:
 *         description: Token puuttuu tai on virheellinen
 *       404:
 *         description: Käyttäjää ei löytynyt tai ei muokkausoikeutta
 *   delete:
 *     summary: Poistaa käyttäjän (vain oma tili tai admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Käyttäjä poistettu
 *       401:
 *         description: Token puuttuu tai on virheellinen
 *       404:
 *         description: Käyttäjää ei löytynyt
 */

userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric('fi-FI'),
    body('password').trim().isLength({min: 8}),
    body('email').trim().isEmail().normalizeEmail(),
    validationErrors,
    postUser
  );

userRouter
  .route('/:id')
  .get(param('id').isInt(), validationErrors, getUserById)
  .put(
    authenticateToken,
    param('id').isInt(),
    body('username')
      .optional()
      .trim()
      .isLength({min: 3, max: 20})
      .isAlphanumeric('fi-FI'),
    body('password').optional().trim().isLength({min: 8}),
    body('email').optional().trim().isEmail().normalizeEmail(),
    validationErrors,
    putUser
  )
  .delete(authenticateToken, param('id').isInt(), validationErrors, deleteUser);

export default userRouter;
