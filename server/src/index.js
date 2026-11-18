import express from 'express';
import path from 'path';
import mediaRouter from './routes/media-routes.js';
import userRouter from './routes/user-routes.js';
import likeRouter from './routes/like-routes.js';
import authRouter from './routes/auth.router.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());

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

// Media resource routes (/api/media endpoints)

app.use('/api/media', mediaRouter);

// User resource routes (/api/users endpoints)
app.use('/api/users', userRouter);

// Like resource routes (/api/likes endpoints)
app.use('/api/likes', likeRouter);

// user authentication
app.use('/api/auth', authRouter);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
