import express, {Router} from 'express';
import {addCourse, getCourses, getCourseById, updateCourse, deleteCourse} from '../controllers';
import {validateObjectID} from '../middlewares';
export const courseRouter = Router();

courseRouter.post('/', addCourse);
courseRouter.get('/', getCourses);
courseRouter.get('/:id', validateObjectID, getCourseById);
courseRouter.patch('/:id', validateObjectID, updateCourse);
courseRouter.delete('/:id', validateObjectID, deleteCourse);