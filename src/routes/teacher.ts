import express, {Router} from 'express';
import {getTeachers} from '../controllers';

export const teacherRouter = Router();

teacherRouter.get('/', getTeachers);