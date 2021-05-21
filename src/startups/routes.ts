import express, {Express, Request, Response, NextFunction} from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import {homeRouter, teacherRouter, courseRouter, studentRouter, classRouter, sessionRouter} from '../routes';
import {error} from '../middlewares';

export const routes = (app: Express) => {
   app.use(cors({origin: '*', credentials: true}));
   app.use(bodyParser.urlencoded({extended: true}));
   app.use(bodyParser.json());
   app.use(express.json());
   app.use(morgan('tiny'));
   app.use(cookieParser());

   app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
      );
      next();
    });

    app.use('/', homeRouter);
    app.use('/api/teachers', teacherRouter);
    app.use('/api/courses', courseRouter);
    app.use('/api/students', studentRouter);
    app.use('/api/classes', classRouter);
    app.use('/api/sessions', sessionRouter);

    app.use(error);
}

