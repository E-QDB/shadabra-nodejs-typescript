import { Request, Response } from "express";
import mongoose from "mongoose";
import { logger } from "../helpers";
import {
  AddSessionRequest,
  ISession,
  ITeacher,
  sessionSchema,
  IClass,
  classSchema,
  teacherSchema,
} from "../models";
import { SuccessResponse, BadRequest, NotFound } from "../helpers";
import { PAGINATION, SORTING } from "../constants";

const Session = mongoose.model<ISession>("session", sessionSchema, "session");
const Class = mongoose.model<IClass>("class", classSchema, "class");
const Teacher = mongoose.model<IClass>("teacher", teacherSchema, "teacher");

export const getSessionById = async (req: Request, res: Response) => {
  try {
    let session = await Session.findById(req.params.id)
      .populate("class", "id name courseId")
      .populate("teacher", "id name");
    return !session
      ? NotFound(res, "Session Not Found")
      : SuccessResponse(res, session);
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};

export const getSessions = async (req: Request, res: Response) => {
  try {
    const {
      name = "",
      classId,
      teacherId,
      pageSize,
      pageIndex,
      orderByColumn,
      orderByDirection = SORTING.DEFAULT_ORDER_BY_DIRECTION,
    } = req.query;
    const size = +(pageSize as string);
    const index = +(pageIndex as string);
    const teacherIdQuery = !teacherId
      ? ({} as any)
      : { teacher: teacherId };
    const classIdQuery = !classId
      ? ({} as any)
      : { class: classId };
    const filter = {
      $and: [
        classIdQuery,
        teacherIdQuery,
        {
          name: {
            $regex: name as string,
            $options: "i",
          },
        },
      ],
    };
    const isGetAll = !(pageSize && pageIndex);
    const sessions = await Session.find(filter)
      .populate("class", "id name")
      .populate("teacher", "id name")
      .select(isGetAll ? "id name" : "")
      .sort(`${orderByDirection === "asc" ? "" : "-"}${orderByColumn}`)
      .skip(isGetAll ? 0 : (index - 1) * size)
      .limit(isGetAll ? 0 : size);
    const data = {
      count: sessions.length,
      pageIndex: isGetAll ? 1 : index,
      pageSize: isGetAll ? sessions.length : size,
      data: sessions,
    };
    return SuccessResponse(res, data);
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};

export const addSession = async (req: Request, res: Response) => {
  try {
    const { class: classSession, teacher, ...sessionInfo } = req.body as AddSessionRequest;
    const session = new Session(sessionInfo);
    const result = await session.save();

    await Class.findByIdAndUpdate(
      classSession,
      { $push: { sessions: result.id } },
      { new: true, useFindAndModify: false }
    );

    await Teacher.findByIdAndUpdate(
      teacher,
      { $push: { sessions: result.id } },
      { new: true, useFindAndModify: false }
    );

    await Session.findByIdAndUpdate(
      result.id,
      { $push: { teacher: teacher } },
      { new: true, useFindAndModify: false }
    );

    await Session.findByIdAndUpdate(
      result.id,
      { $push: { class: classSession } },
      { new: true, useFindAndModify: false }
    );

    return SuccessResponse(res, result, 201);
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};

export const updateSession = async (req: Request, res: Response) => {
  try {
   return SuccessResponse(res, null);
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return NotFound(res, "Session Not Found");
    } else {
      await session.delete();
      return SuccessResponse(res, null, 204);
    }
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};
