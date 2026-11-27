import express from 'express';
import {getMe, postLogin} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrors} from '../middlewares/error-handler.js';
import {body} from 'express-validator';
import rateLimit from 'express-rate-limit';

const authRouter = express.Router();

// Rate limiting login reitille estämään brute force -hyökkäyksiä.
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minuuttia
  max: 10, // Enintään 10 yritystä per IP
  message: {error: 'Too many login attempts, please try again later.'},
});

/* authRouter.route('/login').post(postLogin); */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/auth/login:
 *   post:
 *     summary: Kirjaudu sisään ja hae JWT-token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: SeppoTaalasmaa
 *               password:
 *                 type: string
 *                 example: uusisalasana456
 *     responses:
 *       200:
 *         description: Kirjautuminen onnistui, palauttaa käyttäjätiedot ja JWT-tokenin
 *       401:
 *         description: Virheellinen käyttäjätunnus tai salasana
 *
 * /api/auth/me:
 *   get:
 *     summary: Hae kirjautuneen käyttäjän tiedot tokenin perusteella
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kirjautuneen käyttäjän tiedot
 *       401:
 *         description: Token puuttuu tai on virheellinen
 */
authRouter
  .route('/login')
  .post(
    loginLimiter,
    body('username').trim().notEmpty(),
    body('password').trim().notEmpty(),
    validationErrors,
    postLogin
  );

authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
