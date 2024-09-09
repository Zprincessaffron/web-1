import express, { urlencoded } from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'
import {mongoose} from "mongoose";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"

const app = express();
dotenv.config();

// const allowedOrigins = ['https://66deb079aeaf64f4710baf2f--incomparable-lolly-f12851.netlify.app/'];
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
