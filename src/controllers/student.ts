import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { logger } from "../helpers";
import {
  AddStudentRequest,
  IStudent,
  studentSchema
} from "../models";
import { SuccessResponse, BadRequest, NotFound } from "../helpers";
import { PAGINATION, SORTING } from "../constants";

const Student = mongoose.model<IStudent>("student", studentSchema, "student");

export const addStudent = async (req: Request, res: Response) => {
  try {
    const student = new Student(req.body as AddStudentRequest);
    if (!req.body.name) {
      return BadRequest(res, "Student name is required!");
    }
    const result = await student.save();
    return SuccessResponse(res, result, 201);
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const {
      name = "",
      phone = "",
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
          phone: {
            $regex: phone as string,
            $options: "i",
          },
        },
      ],
    };
    const isGetAll = !(pageSize && pageIndex);
    const students = await Student.find(filter)
      .populate("classes", "id name courseId")
      .select(isGetAll ? "id name" : "")
      .sort(`${orderByDirection === "asc" ? "" : "-"}${orderByColumn}`)
      .skip(isGetAll ? 0 : (index - 1) * size)
      .limit(isGetAll ? 0 : size);
    const data = {
      count: students.length,
      pageIndex: isGetAll ? 1 : index,
      pageSize: isGetAll ? students.length : size,
      data: students,
    };
    return SuccessResponse(res, data);
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    let student = await Student.findById(req.params.id)
    return student ? SuccessResponse(res, student) : NotFound(res, "Student not found")
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }

}

export const updateStudent = async (req: Request, res: Response) => {
  try {
    let studentId = req.params.id;
    if (!req.body) {
      return BadRequest(res, "Data to update can not be empty");
    }
    if (!req.body.name) {
      return BadRequest(res, "Student name is required");
    }
    let student = Student.findByIdAndUpdate(studentId, req.body, {
      useFindAndModify: false,
    })
    return student ? SuccessResponse(res, null, 204) : NotFound(res, "Student not found")
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if(!student) {
      return NotFound(res, "Student not found")
    } else {
      await student.delete();
      return SuccessResponse(res, null, 204);
    }
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};
