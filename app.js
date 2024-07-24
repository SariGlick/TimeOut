import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import profileRouter from './router/profile.router.js';
import { pageNotFound, serverErrors } from './middleware/handleErrors.js';
import { connectMongo } from './config/db.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

connectMongo();

app.get('/', (req, res) => {
    res.send('Welcome to Time Out profile-server');
});

app.use('/profiles', profileRouter);

app.use(pageNotFound);

app.use(serverErrors);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});
