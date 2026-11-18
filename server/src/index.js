import express from 'express';
import cors from 'cors';
import productRouter from './routes/product-routes.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());
app.use(cors());

// media-kansion kuvat tarjoillaan /media-urlissa
app.use('/media', express.static('media'));

// API "docs" using pug template engine
app.get('/api', (req, res) => {
  res.render('index', {
    title: 'MYY JA OPI - API',
    message: 'MYY ja Opi -sovelluksen API-dokumentaatio!',
  });
});

// Api routes
app.use('/api/products', productRouter);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
