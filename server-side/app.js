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


<<<<<<< HEAD
<<<<<<< HEAD
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());

=======
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
=======
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));//הדפסת המידע של כל הבקשה 
app.use(cors());

>>>>>>> e1846fe75f6d92f5dfa7a440988cb38473a34797
dotenv.config();
connectMongo();
app.get('/',(req,res)=>{
    res.send('welcome to time out ');
})
app.use('/uploads',express.static('uploads'))
app.use('/preferences',preferencesRouter);
app.use('/websites',websitesRouter);
app.use('/profiles',profilesRouter);
app.use('/vistedWebsites',visitedWebSitesRouter);
app.use('/users',usersRouter);
app.use(pageNotFound);
app.use(serverErrors)
let port= process.env.PORT;

app.listen(port,()=>{
    console.log(` running at http://localhost:${port}`);
})

export default app;