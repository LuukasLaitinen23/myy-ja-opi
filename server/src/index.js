import express from 'express';
import cors from 'cors';
import productRouter from './routes/product-routes.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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
app.use(cors());

// media-kansion kuvat tarjoillaan /media-urlissa
app.use('/media', express.static('media'));

// API "docs" using pug template engine
app.get('/', (req, res) => {
  res.render('index', {
    title: 'MYY JA OPI - API',
    message: 'MYY ja Opi -sovelluksen API-dokumentaatio!',
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Api routes
app.use('/api/products', productRouter);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
