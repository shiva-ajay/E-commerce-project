import 'dotenv/config';
import cors from 'cors';

import express from 'express';
import connectDB from './db/Database.js';
import cookieParser from "cookie-parser";
import userRoute from './routes/userRoute.js'


const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("uploads"));

connectDB();

app.use("/api/v1/user", userRoute);

app.get('/', (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
 