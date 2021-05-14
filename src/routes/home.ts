import express, { Router, Request, Response } from 'express';

export const homeRouter: Router = express.Router();

homeRouter.get('/', (req: Request, res: Response) => {
   res.send('Home Page');
})

homeRouter.get('/test', (req: Request, res: Response) => {
   res.send('Test');
})