import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../backend/config/db.js';
import UserRouter from '../backend/routes/UserRouter.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import MovieRouter from '../backend/routes/MovieRouter.js'
import CategorieRouter from '../backend/routes/CategorieRouter.js'


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


connectDB();

app.get("/", (req, res) => {
    res.send('API is running...');
});

app.use("/api/users", UserRouter);
app.use("/api/movies", MovieRouter);
app.use("/api/categories", CategorieRouter);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`This server running at http://localhost/${PORT}`)
})

