import mongoose from "mongoose";

const connectDB = async () => {

  mongoose.connection.on('connected', () => {

    console.log("connection established");

  })

  await mongoose.connect(`${process.env.DB_URL}/database`);

}

export default connectDB;
