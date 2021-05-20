import {Router} from 'express';
import {getSessions, addSession, updateSession, getSessionById, deleteSession} from '../controllers';
import { validateObjectID } from '../middlewares';

export const sessionRouter = Router();

sessionRouter.get('/', getSessions);
sessionRouter.post('/', addSession);
sessionRouter.get('/:id', validateObjectID, getSessionById);
sessionRouter.patch('/:id', validateObjectID, updateSession);
sessionRouter.delete('/:id', validateObjectID, deleteSession)