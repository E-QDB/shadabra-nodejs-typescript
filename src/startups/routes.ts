import express, {Express} from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import {homeRouter} from '../routes';
import {error} from '../middlewares';

export const routes = (app: Express) => {
   app.use(cors({origin: '*', credentials: true}));
   app.use(bodyParser.urlencoded({extended: true}));
   app.use(bodyParser.json());
   app.use(express.json());
   app.use(morgan('tiny'));
   app.use(cookieParser());

   app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
      );
      next();
    });

    app.use('/', homeRouter);

    app.use(error);
}