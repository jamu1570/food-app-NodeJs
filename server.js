import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import connectDB from './config/db.js';
import helmet from 'helmet';
// import csurf from 'csurf';
import rateLimit from 'express-rate-limit';
import path from 'path';
// import oasGenerator from 'express-oas-generator';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
// import mongoSanitize from 'express-mongo-sanitize';

// Force set NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });


const swaggerFile = JSON.parse(readFileSync('./swagger_output.json', 'utf8'));

// DB connection
connectDB();

const app = express();

// middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100
});

app.use(limiter);
app.use(helmet());
// app.use(csurf());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.disable('x-powered-by');
// app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', '*');
  response.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use(routes);
// Serve uploaded files statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
// app.use(errorHandler);

app.get('/', (req, res) => {
  return res.status(200).send('welcome to food app');
});

// Dynamically load JSON
// const swaggerFile = await import('./swagger_output.json', { assert: { type: 'json' } }).then(m => m.default);

// Swagger UI (automatically generated)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}, running in  ${process.env.NODE_ENV}`);
});

export default app;