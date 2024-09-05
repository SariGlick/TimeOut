import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser  from 'cookie-parser';
import preferencesRouter from './router/preference.router.js';
import WebsitesRouter from './router/websites.router.js';
import profileRouter from './router/profile.router.js'
import visitedWebsiteRouter from './router/visitedWebsite.router.js'
import userRouter from './router/user.router.js'



import invitationsRouter from './router/invitation.router.js'
import pendingUsersRouter from './router/pendingUser.router.js'
import {pageNotFound,serverErrors} from './middleware/handleErrors.js'
import {connectMongo} from './config/db.js'

import settingsRouter from './router/settings.router.js'; 

const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());
dotenv.config();
connectMongo();



app.get('/', (req, res) => {
    res.send('welcome to time out ');
})

app.use('/uploads',express.static('uploads'))

app.use('/preferences',preferencesRouter);

app.use('/websites',WebsitesRouter);
app.use('/profiles',profileRouter);
app.use('/vistedWebsite',visitedWebsiteRouter);
app.use('/users',userRouter);
app.use(pageNotFound);
app.use(serverErrors)
let port= process.env.PORT;
app.listen(port,()=>{
    console.log(` running at http://localhost:${port}`);
})
app.use('/invitations',invitationsRouter);
app.use('/pendingUsers',pendingUsersRouter);
app.use('/api', settingsRouter);
app.use(pageNotFound);
app.use(serverErrors)


export default app;

