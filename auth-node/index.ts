require("dotenv").config();
console.log(process.env.JWT_SECRET);

import express from 'express';
import mongoose from 'mongoose';
import { routes } from './src/routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

mongoose.connect('mongodb://localhost/node_auth').then((db) => {
    console.log('Connected to MongoDB');
});

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

routes(app);

app.listen(8000, () => {
    console.log('Server started on port 8000');
})