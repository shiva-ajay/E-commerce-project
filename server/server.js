import express from 'express';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 8000;

// Define a simple route
app.get('/', (req, res) => {
    res.send("API Working");
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
