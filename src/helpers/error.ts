import httpStatus from 'http-status';
import { Response } from 'express';

const response = (httpStatusCode: number, errorMessage: string | null, errorCode: number | null, data: any) => {
  return {
    httpStatusCode,
    errorMessage,
    errorCode,
    data
  };
};

  export const SuccessResponse = (res: Response, data: any, statusCode = 200) => {
    res.status(statusCode).json(response(statusCode, null, null, data));
  };
  
  export const BadRequest = (res: Response, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(response(httpStatus.BAD_REQUEST, serverError, errorCode, data));
  };
  
  export const NoContent = (res: Response, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.NO_CONTENT)
      .json(response(httpStatus.NO_CONTENT, serverError, errorCode, data));
  };
  
  export const Unauthorized = (res: Response, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json(response(httpStatus.UNAUTHORIZED, serverError, errorCode, data));
  };
  
  export const Forbidden = (res: Response, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.FORBIDDEN)
      .json(response(httpStatus.FORBIDDEN, serverError, errorCode, data));
  };
  
  export const NotFound = (res: Response, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.NOT_FOUND)
      .json(response(httpStatus.NOT_FOUND, serverError, errorCode, data));
  };
  
  export const MethodNotAllowed = (res: Response, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.METHOD_NOT_ALLOWED)
      .json(
        response(httpStatus.METHOD_NOT_ALLOWED, serverError, errorCode, data)
      );
  };
  
  export const InternalServerError = (res: Response, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json(
        response(httpStatus.INTERNAL_SERVER_ERROR, serverError, errorCode, data)
      );
  };
  
  export const Conflict = (res: Response, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.CONFLICT)
      .json(response(httpStatus.CONFLICT, serverError, errorCode, data));
  }
