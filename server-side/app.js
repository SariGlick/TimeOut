import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
<<<<<<< HEAD
import PreferenceRouter from './router/preference.router.js';
import preferencesRouter from './router/preference.router.js';
import WebsitesRouter from './router/websites.router.js';
import profileRouter from './router/profile.router.js'
import visitedWebsiteRouter from './router/visitedWebsite.router.js'
import userRouter from './router/user.router.js'
=======
import preferencesRouter from './router/preference.router.js';
import websitesRouter from './router/websites.router.js';
import profilesRouter from './router/profile.router.js'
import visitedWebSitesRouter from './router/visitedWebsite.router.js'
import usersRouter from './router/user.router.js'
>>>>>>> 9b418204928598b6d7eda4b6b9ba01463f7803d9
import {pageNotFound,serverErrors} from './middleware/handleErrors.js'
import {connectMongo} from './config/db.js'


const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));//הדפסת המידע של כל הבקשה 
app.use(cors());

dotenv.config();
connectMongo();
app.get('/',(req,res)=>{
    res.send('welcome to time out ');
})
app.use('/uploads',express.static('uploads'))
<<<<<<< HEAD
app.use('/preferences',PreferenceRouter);
app.use('/preferences',preferencesRouter);
app.use('/websites',WebsitesRouter);
app.use('/profiles',profileRouter);
app.use('/vistedWebsite',visitedWebsiteRouter);
app.use('/users',userRouter);
=======
app.use('/preferences',preferencesRouter);
app.use('/websites',websitesRouter);
app.use('/profiles',profilesRouter);
app.use('/vistedWebsites',visitedWebSitesRouter);
app.use('/users',usersRouter);
>>>>>>> 9b418204928598b6d7eda4b6b9ba01463f7803d9
app.use(pageNotFound);
app.use(serverErrors)
let port= process.env.PORT;

app.listen(port,()=>{
    console.log(` running at http://localhost:${port}`);
})

export default app;