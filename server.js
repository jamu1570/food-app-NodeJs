import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import connectDB from './config/db.js';

dotenv.config();

// DB connection
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/", routes)

app.get('/', (req, res) => {
  return res.status(200).send('welcome to food app');
});

// eslint-disable-next-line no-undef
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
