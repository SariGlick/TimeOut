import express from 'express';
import https from 'https';
import fs from 'fs';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import preferencesRouter from './router/preference.router.js';
import websitesRouter from './router/websites.router.js';
import profilesRouter from './router/profile.router.js';
import visitedWebSitesRouter from './router/visitedWebsite.router.js';
import usersRouter from './router/user.router.js';
import { pageNotFound, serverErrors } from './middleware/handleErrors.js';
import { connectMongo } from './config/db.js';

dotenv.config();
connectMongo();

const app = express();

const corsOptions = {
  origin: 'chrome-extension://bcmdbgmbffljogmenfmblpikdmlfdaca',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['set-cookie'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('welcome to time out');
});

app.use('/uploads', express.static('uploads'));
app.use('/preferences', preferencesRouter);
app.use('/websites', websitesRouter);
app.use('/profiles', profilesRouter);
app.use('/vistedWebSites', visitedWebSitesRouter);
app.use('/users', usersRouter);
app.use(pageNotFound);
app.use(serverErrors);

const port = process.env.PORT || 5000;

const options = {
  key: fs.readFileSync('../mykey.key'),
  cert: fs.readFileSync('../mycert.crt'),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});
