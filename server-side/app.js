import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import preferencesRouter from './router/preference.router.js';
import websitesRouter from './router/websites.router.js';
<<<<<<< HEAD
import profilesRouter from './router/profile.router.js'
import visitedWebSitesRouter from './router/visitedWebsite.router.js'
import usersRouter from './router/user.router.js'
import {pageNotFound,serverErrors} from './middleware/handleErrors.js'
import {connectMongo} from './config/db.js'


const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());
=======
import profilesRouter from './router/profile.router.js';
import visitedWebSitesRouter from './router/visitedWebsite.router.js';
import usersRouter from './router/user.router.js';
import settingsRouter from './router/settings.router.js'; 
import { pageNotFound, serverErrors } from './middleware/handleErrors.js';
import { connectMongo } from './config/db.js';
>>>>>>> 74f67f50c8ffb1942092e670a609eb5f84bfac7e

dotenv.config();
connectMongo();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
    res.send('welcome to time out ');
});

app.use('/uploads', express.static('uploads'));
app.use('/preferences', preferencesRouter);
app.use('/websites', websitesRouter);
app.use('/profiles', profilesRouter);
app.use('/vistedWebSites', visitedWebSitesRouter);
app.use('/users', usersRouter);
app.use('/api', settingsRouter);

app.use(pageNotFound);
app.use(serverErrors);
<<<<<<< HEAD
=======

const port = process.env.PORT;
app.listen(port, () => {
});
>>>>>>> 74f67f50c8ffb1942092e670a609eb5f84bfac7e

if (require.main === module) {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

export default app;
<<<<<<< HEAD
=======

>>>>>>> 74f67f50c8ffb1942092e670a609eb5f84bfac7e
