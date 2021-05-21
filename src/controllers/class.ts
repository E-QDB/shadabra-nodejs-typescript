import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { logger } from "../helpers";
import {
  AddClassRequest,
  IClass,
  classSchema
} from "../models";
import { SuccessResponse, BadRequest, NotFound } from "../helpers";
import { PAGINATION, SORTING } from "../constants";

const Class = mongoose.model<IClass>("class", classSchema, "class");

export const addClass = async (req: Request, res: Response) => {
  try {
    const _class = new Class(req.body as AddClassRequest);
    if (!req.body.name) {
      return BadRequest(res, "Class name is required!");
    }
    const result = await _class.save();
    return SuccessResponse(res, result, 201);
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};

export const getClasses = async (req: Request, res: Response) => {
  try {
    const {
      name = "",
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
      ],
    };
    const isGetAll = !(pageSize && pageIndex);
    const classes = await Class.find(filter)
      .populate("course", "id name")
      .select(isGetAll ? "id name" : "")
      .sort(`${orderByDirection === "asc" ? "" : "-"}${orderByColumn}`)
      .skip(isGetAll ? 0 : (index - 1) * size)
      .limit(isGetAll ? 0 : size);
    const data = {
      count: classes.length,
      pageIndex: isGetAll ? 1 : index,
      pageSize: isGetAll ? classes.length : size,
      data: classes,
    };
    return SuccessResponse(res, data);
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    let _class = await Class.findById(req.params.id)
    return _class ? SuccessResponse(res, _class) : NotFound(res, "Class not found")
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }

}

export const updateClass = async (req: Request, res: Response) => {
  try {
    let classId = req.params.id;
    if (!req.body) {
      return BadRequest(res, "Data to update can not be empty");
    }
    if (!req.body.name) {
      return BadRequest(res, "Class name is required");
    }
    let classes = Class.findByIdAndUpdate(classId, req.body, {
      useFindAndModify: false,
    })
    return classes ? SuccessResponse(res, null, 204) : NotFound(res, "Class not found")
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    const _class = await Class.findById(req.params.id);
    if(!_class) {
      return NotFound(res, "Class not found")
    } else {
      await _class.delete();
      return SuccessResponse(res, null, 204);
    }
  } catch (error) {
    logger.error(error);
    return BadRequest(res, error);
  }
};
