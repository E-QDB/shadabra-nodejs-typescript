import {Express} from 'express';
import helmet from 'helmet';
import compression from 'compression';

export const production = (app: Express) => {
  app.use(helmet());
  app.use(compression());
};