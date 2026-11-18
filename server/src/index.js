import express from 'express';
import cors from 'cors';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());
app.use(cors());

// public-kansion kaikki sisältö tarjoillaan palvelimen juuri-urlissa
app.use('/', express.static('public'));

// media-kansion kuvat tarjoillaan /media-urlissa
app.use('/media', express.static('media'));

// API "docs" using pug template engine
app.get('/api', (req, res) => {
  res.render('index', {
    title: 'Example REST api',
    message: 'Dummy /items endpoint API for now.',
  });
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
