import {Request, Response} from 'express';
import mongoose from 'mongoose';
import {logger} from '../helpers';
import {AddTeacherRequest, ITeacher, teacherSchema, IClass, classSchema} from '../models';
import {SuccessResponse, BadRequest, NotFound} from '../helpers';
import {PAGINATION, SORTING} from '../constants';

const Teacher = mongoose.model<ITeacher>('teacher', teacherSchema, 'teacher');
const Class = mongoose.model<IClass>('class', classSchema, 'class');

export const getTeacherById = async (req: Request, res: Response) => {
  try {
    let teacher = await Teacher.findById(req.params.id).populate('classes', 'id name courseId');
    return !teacher ? NotFound(res, 'Teacher Not Found') : SuccessResponse(res, teacher);
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
}

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
    classIds && classIds?.length > 0 && classIds.forEach(async (classId) => {
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

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {classIds, ...teacherInfo} = req.body as AddTeacherRequest;
    const updateBody = classIds ? {...teacherInfo, classes: []} : teacherInfo;
    const result = await Teacher.findByIdAndUpdate(req.params.id, updateBody);
    classIds && classIds?.length > 0 && classIds.forEach(async (classId) => {
      await Class.findByIdAndUpdate(
        classId,
        { $push: { teachers: id } },
        { new: true, useFindAndModify: true}
      );
      await Teacher.findByIdAndUpdate(
        id,
        { $push: { classes: classId } },
        { new: true, useFindAndModify: true }
      );
    });
    return SuccessResponse(res, result);
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
}

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('classes', 'id name courseId');
    if(!teacher) {
      return NotFound(res, 'Teacher Not Found')
    } else {
      await teacher.delete();
      return SuccessResponse(res, null, 204);
    } 
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
}
