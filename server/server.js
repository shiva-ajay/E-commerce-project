import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import connectDB from './db/Database.js';
import cookieParser from "cookie-parser";
import userRoute from './routes/userRoute.js';
import shopRoute from './routes/shopRoute.js';
import productRoute from './routes/productRoute.js';

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend's origin
    credentials: true, // Enable credentials
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("uploads"));

connectDB();

app.use("/api/v1/user", userRoute);
app.use("/api/v1/shop", shopRoute);
app.use("/api/v1/product", productRoute);

app.get('/', (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
