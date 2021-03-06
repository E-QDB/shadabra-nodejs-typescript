import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { logger } from "../helpers";
import {
  AddCourseRequest,
  ICourse,
  courseSchema,
  IClass,
  classSchema,
} from "../models";
import { SuccessResponse, BadRequest, NotFound } from "../helpers";
import { PAGINATION, SORTING } from "../constants";

const Course = mongoose.model<ICourse>("course", courseSchema, "course");
const Class = mongoose.model<IClass>("class", classSchema, "class");

export const addCourse = async (req: Request, res: Response) => {
  try {
    const courseInfo = new Course(req.body as AddCourseRequest);
    if (!req.body.name) {
      return BadRequest(res, "Course name is required!");
    }
    const result = await courseInfo.save();
    return SuccessResponse(res, result, 201);
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};

export const getCourses = async (req: Request, res: Response) => {
  try {
    const {
      name = "",
      tech = "",
      pageSize,
      pageIndex,
      orderByColumn,
      orderByDirection = SORTING.DEFAULT_ORDER_BY_DIRECTION,
    } = req.query;
    const size = +(pageSize as string);
    const index = +(pageIndex as string);
    const filter = {
      $and: [
        {
          name: {
            $regex: name as string,
            $options: "i",
          },
        },
        {
          tech: {
            $regex: tech as string,
            $options: "i",
          },
        },
      ],
    };
    const isGetAll = !(pageSize && pageIndex);
    const courses = await Course.find(filter)
      .select(isGetAll ? "id name" : "")
      .sort(`${orderByDirection === "asc" ? "" : "-"}${orderByColumn}`)
      .skip(isGetAll ? 0 : (index - 1) * size)
      .limit(isGetAll ? 0 : size);
    const data = {
      count: courses.length,
      pageIndex: isGetAll ? 1 : index,
      pageSize: isGetAll ? courses.length : size,
      data: courses,
    };
    return SuccessResponse(res, data);
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    let course = await Course.findById(req.params.id)
    return course ? SuccessResponse(res, course) : NotFound(res, "Course not found")
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }

}

export const updateCourse = async (req: Request, res: Response) => {
  try {
    let courseId = req.params.id;
    if (!req.body) {
      return BadRequest(res, "Data to update can not be empty");
    }
    if (!req.body.name) {
      return BadRequest(res, "Class name is required");
    }
    let courses = Course.findByIdAndUpdate(courseId, req.body, {
      useFindAndModify: false,
    })
    return courses ? SuccessResponse(res, null, 204) : NotFound(res, "Course not found")
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if(!course) {
      return NotFound(res, "Course not found")
    } else {
      await course.delete();
      return SuccessResponse(res, null, 204);
    }
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};
