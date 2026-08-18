import compression from 'compression';
import cors from 'cors';
import express, { type Express } from 'express';
import { xss } from 'express-xss-sanitizer';
import helmet from 'helmet';
import router from './routes/v1';
import { errorHandler, notFoundHandler } from './middleware';

const app: Express = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(xss());

app.use(compression());

app.use(cors());

app.use('/api/v1', router);
app.use('*fallback', notFoundHandler);
app.use(errorHandler);

export default app;
