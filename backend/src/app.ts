import cors from 'cors';
import express from 'express';

import { routes } from './routes';

export const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use(express.json());

app.use(routes);