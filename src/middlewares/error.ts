import { request } from 'express';
import {Request, Response} from 'express';
import {logger, InternalServerError} from '../helpers';

export const error = (err: any, req: Request, res: Response) => {
   logger.error(err);
   console.log(err);
   return InternalServerError(res, err);
}