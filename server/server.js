import dotenv from "dotenv";
import cors from 'cors';
import express from 'express';
import connectDB from './db/Database.js';
import cookieParser from "cookie-parser";
import userRoute from './routes/userRoute.js';
import shopRoute from './routes/shopRoute.js';
import productRoute from './routes/productRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import orderRoute from './routes/orderRoute.js';
import { v2 as cloudinary } from "cloudinary";

const app = express();
const port = process.env.PORT || 8000;

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});


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
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/order", orderRoute);

app.get('/', (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
