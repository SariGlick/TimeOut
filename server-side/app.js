import express from 'express';
import http from 'http'; 
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
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
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'chrome-extension://bcmdbgmbffljogmenfmblpikdmlfdaca'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true  
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

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

http.createServer(app).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
