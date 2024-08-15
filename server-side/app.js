import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import preferencesRouter from './router/preference.router.js';
import websitesRouter from './router/websites.router.js';
import invitationsRouter from './router/invitation.router.js'
import pendingUsersRouter from './router/pendingUser.router.js'
import {pageNotFound,serverErrors} from './middleware/handleErrors.js'
import {connectMongo} from './config/db.js'
import profilesRouter from './router/profile.router.js';
import visitedWebSitesRouter from './router/visitedWebsite.router.js';
import usersRouter from './router/user.router.js';
import settingsRouter from './router/settings.router.js'; 


dotenv.config();
connectMongo();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
    res.send('welcome to time out ');
})

app.use('/invitations',invitationsRouter);
app.use('/pendingUsers',pendingUsersRouter);
app.use('/uploads', express.static('uploads'));
app.use('/preferences', preferencesRouter);
app.use('/websites', websitesRouter);
app.use('/profiles', profilesRouter);
app.use('/vistedWebSites', visitedWebSitesRouter);
app.use('/users', usersRouter);
app.use('/api', settingsRouter);
app.use(pageNotFound);
app.use(serverErrors);

const port = process.env.PORT;
app.listen(port, () => {
});


export default app;
