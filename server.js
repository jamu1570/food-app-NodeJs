import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import connectDB from './config/db.js';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

// DB connection
connectDB();

const app = express();

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', '*');
  response.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use(routes);
// app.use(errorHandler);

app.get('/', (req, res) => {
  return res.status(200).send('welcome to food app');
});

// eslint-disable-next-line no-undef
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
