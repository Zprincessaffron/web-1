import express, { urlencoded } from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'
import {mongoose} from "mongoose";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"

const app = express();
dotenv.config();

// const allowedOrigins = ['http://localhost:5173/'];
// app.use(cors({
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Enable credentials
// }));
// Allow requests from your Vercel frontend
app.use(cors({
  origin: 'http://localhost:5173', // Your Vercel domain https://web-1-8cji.vercel.app
  credentials: true
}));
// https://saffronfrontend-lq61-2m631zo39-prems-projects-8f178100.vercel.app
// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('Database Connected Successfully'))
.catch((err)=> console.log('Database not Connected' , err))

const PORT = process.env.PORT;


app.use('/', authRoutes );


app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
