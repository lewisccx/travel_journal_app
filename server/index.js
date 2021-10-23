import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

const expressOptions = {
    limit:'30mb',
    extended: true
}

app.use(express.json(expressOptions))
app.use(express.urlencoded(expressOptions));
app.use(cors());
app.use('/posts', postRoutes);

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(DB_URL).then(() =>
    app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}` ))
).catch((error) => console.log(error.message));

