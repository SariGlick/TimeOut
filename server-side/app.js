import express from 'express';
<<<<<<< HEAD
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import PreferenceRouter from './router/preference.router.js';
import WebsitesRouter from './router/websites.router.js';
import profileRouter from './router/profile.router.js'
import visitedWebsiteRouter from './router/visitedWebsite.router.js'
import userRouter from './router/user.router.js'
=======
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import preferencesRouter from './router/preference.router.js';
import websitesRouter from './router/websites.router.js';
import invitationsRouter from './router/invitation.router.js'
import pendingUsersRouter from './router/pendingUser.router.js'
>>>>>>> 82fa524d03d5df0b94a5d120e47c7ca054cee709
import {pageNotFound,serverErrors} from './middleware/handleErrors.js'
import {connectMongo} from './config/db.js'
import profilesRouter from './router/profile.router.js';
import visitedWebSitesRouter from './router/visitedWebsite.router.js';
import usersRouter from './router/user.router.js';
import settingsRouter from './router/settings.router.js'; 


<<<<<<< HEAD
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());

=======
>>>>>>> 82fa524d03d5df0b94a5d120e47c7ca054cee709
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
<<<<<<< HEAD
app.use('/uploads',express.static('uploads'))
app.use('/preferences',PreferenceRouter);
app.use('/websites',WebsitesRouter);
app.use('/profiles',profileRouter);
app.use('/vistedWebsite',visitedWebsiteRouter);
app.use('/users',userRouter);
=======

app.use('/invitations',invitationsRouter);
app.use('/pendingUsers',pendingUsersRouter);
app.use('/uploads', express.static('uploads'));
app.use('/preferences', preferencesRouter);
app.use('/websites', websitesRouter);
app.use('/profiles', profilesRouter);
app.use('/vistedWebSites', visitedWebSitesRouter);
app.use('/users', usersRouter);
app.use('/api', settingsRouter);
>>>>>>> 82fa524d03d5df0b94a5d120e47c7ca054cee709
app.use(pageNotFound);
app.use(serverErrors);
const port = process.env.PORT;
app.listen(port, () => {
});

<<<<<<< HEAD
app.listen(port,()=>{
    console.log(` running at http://localhost:${port}`);
})

=======
>>>>>>> 82fa524d03d5df0b94a5d120e47c7ca054cee709
export default app;
