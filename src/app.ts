import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalError from './app/middlewares/globalError';
import { BooksRoute } from './app/modules/user.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api', BooksRoute);

app.use(globalError);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world, running');
});

export default app;
