import express, {Router} from 'express';
import {getTeachers, addTeacher} from '../controllers';

export const teacherRouter = Router();

teacherRouter.get('/', getTeachers);
teacherRouter.post('/', addTeacher);