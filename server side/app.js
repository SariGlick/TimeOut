
import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import PreferenceRouter from './router/preference.router.js';
import WebsitesRouter from './router/websites.router.js';
import {pageNotFound,serverErrors} from './middleware/handleErrors.js'
import dotenv from 'dotenv'
import {connecMongo} from './config/db.js'


const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));//הדפסת המידע של כל הבקשה 
app.use(cors());

dotenv.config();
connecMongo();
app.get('/',(req,res)=>{
    res.send('welcome to time out ');
})
app.use('/uploads',express.static('uploads'))
app.use('/preference',PreferenceRouter);
app.use('/websites',WebsitesRouter);
app.use(pageNotFound);
app.use(serverErrors)
let port= process.env.PORT;

app.listen(port,()=>{
    console.log(` runnig at http://localhost:${port}`);
})