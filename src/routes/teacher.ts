import {Router} from 'express';
import {getTeachers, addTeacher, updateTeacher, getTeacherById, deleteTeacher} from '../controllers';
import { validateObjectID } from '../middlewares';

export const teacherRouter = Router();

teacherRouter.get('/', getTeachers);
teacherRouter.post('/', addTeacher);
teacherRouter.get('/:id', validateObjectID, getTeacherById);
teacherRouter.patch('/:id', validateObjectID, updateTeacher);
teacherRouter.delete('/:id', validateObjectID, deleteTeacher)