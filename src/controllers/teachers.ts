import {Request, Response} from 'express';
import mongoose from 'mongoose';
import {logger} from '../helpers';
import {AddTeacherRequest, ITeacher, teacherSchema, IClass, classSchema} from '../models';
import {SuccessResponse, BadRequest} from '../helpers';
import {PAGINATION, SORTING} from '../constants';

const Teacher = mongoose.model<ITeacher>('teacher', teacherSchema, 'teacher');
const Class = mongoose.model<IClass>('class', classSchema, 'class');

export const getTeachers = async (req: Request, res: Response) => {
   try {
      const {name = '', email = '', phone = '', classId ,pageSize, pageIndex, orderByColumn, orderByDirection = SORTING.DEFAULT_ORDER_BY_DIRECTION} = req.query;
      const size = +(pageSize as string);
      const index = +(pageIndex as string);
      const classIdQuery = !classId ? {} as any : { classes: { $in: [classId] } };
      const filter = {
            $and: [
              classIdQuery,
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
       const teachers = await Teacher.find(filter)
         .populate('classes', 'id name courseId')
         .select(isGetAll ? 'id name' : '')
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

export const addTeacher = async (req: Request, res: Response) => {
  try {
    const {classIds, ...teacherInfo} = req.body as AddTeacherRequest;
    const teacher = new Teacher(teacherInfo);
    const result = await teacher.save();
    classIds?.length > 0 && classIds.forEach(async (classId) => {
      await Class.findByIdAndUpdate(
        classId,
        { $push: { teachers: result.id } },
        { new: true, useFindAndModify: false}
      );
      await Teacher.findByIdAndUpdate(
        result.id,
        { $push: { classes: classId } },
        { new: true, useFindAndModify: false }
      );
    });
    return SuccessResponse(res, result, 201);
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
}