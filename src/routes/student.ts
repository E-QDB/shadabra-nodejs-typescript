import express, {Router} from 'express';
import {addStudent, getStudents, getStudentById, updateStudent, deleteStudent} from '../controllers';
import {validateObjectID} from '../middlewares';
export const studentRouter = Router();

studentRouter.post('/', addStudent);
studentRouter.get('/', getStudents);
studentRouter.get('/:id', validateObjectID, getStudentById);
studentRouter.patch('/:id', validateObjectID, updateStudent);
studentRouter.delete('/:id', validateObjectID, deleteStudent);