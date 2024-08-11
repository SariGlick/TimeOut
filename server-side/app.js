import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import preferencesRouter from './router/preference.router.js';
import websitesRouter from './router/websites.router.js';
import profilesRouter from './router/profile.router.js'
import visitedWebSitesRouter from './router/visitedWebsite.router.js'
import usersRouter from './router/user.router.js'
import {pageNotFound,serverErrors} from './middleware/handleErrors.js'
import {connectMongo} from './config/db.js'
import MessageRouter from './router/message.router.js';
import messageTypeRouter from './router/messageType.router.js';

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());

dotenv.config();
connectMongo();

app.get('/',(req,res)=>{
    res.send('welcome to time out ');
});

app.use('/uploads',express.static('uploads'))
app.use('/preferences',preferencesRouter);
app.use('/websites',websitesRouter);
app.use('/profiles',profilesRouter);
app.use('/vistedWebsites',visitedWebSitesRouter);
app.use('/users',usersRouter);
app.use('/message',MessageRouter);
app.use('/messageType',messageTypeRouter);
app.use(pageNotFound);
app.use(serverErrors)
let port= process.env.PORT;

app.listen(port,()=>{
    console.log(` running at http://localhost:${port}`);
})

export default app;