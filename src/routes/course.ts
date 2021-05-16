import express, {Router} from 'express';
import {addCourse, getCourses, updateCourse, deleteCourse} from '../controllers';

export const courseRouter = Router();

courseRouter.post('/', addCourse);
courseRouter.get('/', getCourses);
courseRouter.put('/', updateCourse);
courseRouter.patch('/', deleteCourse);