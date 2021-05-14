import {Request, Response} from 'express';
import {logger} from '../helpers';
import mongoose, { Query } from 'mongoose';
import {ITeacher, teacherSchema} from '../models';
import {SuccessResponse, BadRequest, NotFound} from '../helpers';
import {PAGINATION, SORTING} from '../constants';

const Teacher = mongoose.model<ITeacher>('teacher', teacherSchema, 'teacher');


export const getTeachers = async (req: Request, res: Response) => {
   try {
      const {name = '', email = '', phone = '', pageSize, pageIndex, orderByColumn, orderByDirection = SORTING.DEFAULT_ORDER_BY_DIRECTION} = req.query;
      const size = +(pageSize as string);
      const index = +(pageIndex as string);
      const filter = {
            $and: [
              {
                name: {
                  $regex: name as string,
                  $options: 'i'
                }
              },
              {
                email: {
                  $regex: email as string,
                  $options: 'i'
                }
              },
              {
                phone: {
                  $regex: phone as string,
                  $options: 'i'
                }
              }
            ]
       }
       const isGetAll = !(pageSize && pageIndex);
       const getAllSelectFilter = 'id name'
       const teachers = await Teacher.find(filter)
       .select(isGetAll ? getAllSelectFilter : '')
       .sort(`${orderByDirection === 'asc' ? '' : '-'}${orderByColumn}`)
       .skip(isGetAll ? 0 : (index - 1) * size)
       .limit(isGetAll ? 0 : size);
       const data = {
          count: teachers.length,
          pageIndex: isGetAll ? 1 : index,
          pageSize: isGetAll ? teachers.length : size,
          data: teachers
       }
       return SuccessResponse(res, data);
      } catch (error) {
      logger.error(error);
      return BadRequest(res, error);
   }
}