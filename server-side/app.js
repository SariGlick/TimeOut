import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import PreferenceRouter from './router/preference.router.js';
import WebsitesRouter from './router/websites.router.js';
import profileRouter from './router/profile.router.js'
import visitedWebsiteRouter from './router/visitedWebsite.router.js'
import userRouter from './router/user.router.js'
import {pageNotFound,serverErrors} from './middleware/handleErrors.js'
import {connectMongo} from './config/db.js'


const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());

dotenv.config();
connectMongo();
app.get('/',(req,res)=>{
    res.send('welcome to time out ');
})
app.use('/uploads',express.static('uploads'))
app.use('/preferences',PreferenceRouter);
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

export default app;
