import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalError from './app/middlewares/globalError';
import router from './app/routes';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api', router);

app.use(globalError);

//Not Found
app.use(notFound);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world, running');
});

export default app;
