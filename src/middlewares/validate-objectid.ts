import {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import {ErrorCode} from '../constants';
import { BadRequest } from '../helpers';

export const validateObjectID = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id || req.params.diseaseId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return BadRequest(res, 'Invalid ObjectId', ErrorCode.INVALID_OBJECTID);
  }
  next();
};