import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';

import productRouter from './routes/product-routes.js';
import categoryRouter from './routes/category-routes.js';
import commentRouter from './routes/comment-routes.js';
import userRouter from './routes/user-routes.js';
import authRouter from './routes/auth-routes.js';

import {errorHandler, notFoundHandler} from './middlewares/error-handler.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Api documentation setup using swagger-jsdoc and swagger-ui-express
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Myy ja Opi REST API',
      version: '1.0.0',
      description: 'Myy ja Opi -sovelluksen REST API-dokumentaatio.',
    },
  },
  apis: ['./src/routes/*.js'], // Lukee kommentit kaikista route-tiedostoista
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());
// CORS sallii API:n olla käytössä eri lähteistä
app.use(cors());
// Helmet auttaa suojaamaan sovellusta tunnetuilta web-haavoittuvuuksilta asettamalla asianmukaiset HTTP-headers.
app.use(helmet());
// public-kansion kuvat tarjoillaan /public-urlissa
app.use('/public', express.static('public'));

// API "docs" using pug template engine
app.get('/', (req, res) => {
  res.render('index', {
    title: 'MYY JA OPI - API',
    message: 'MYY ja Opi -sovelluksen API-dokumentaatio!',
  });
});

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API endpoints
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/comments', commentRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// oletusreitti kaikille http-pyynnöille, joille ei ole määritelty reittiä.
app.use(notFoundHandler);
// oletusvirheenkäsittely
app.use(errorHandler);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
