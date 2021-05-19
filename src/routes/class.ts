import express, {Router} from 'express';
import {addClass, getClasses, getClassById, updateClass, deleteClass} from '../controllers';
import {validateObjectID} from '../middlewares';
export const classRouter = Router();

classRouter.post('/', addClass);
classRouter.get('/', getClasses);
classRouter.get('/:id', validateObjectID, getClassById);
classRouter.patch('/:id', validateObjectID, updateClass);
classRouter.delete('/:id', validateObjectID, deleteClass);