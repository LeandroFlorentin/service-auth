import {
  Request as RequestExpress,
  Response as ResponseExpress,
  NextFunction as NextFunctionExpress,
  ErrorRequestHandler as ErrorRequestHandlerExpress,
} from "express";
export interface RequestWithUser extends RequestExpress {
  body: {
    username: string;
    email: string;
    password: string;
    role: number;
  };
}

export type Request = RequestExpress;

export type Response = ResponseExpress;

export type NextFunction = NextFunctionExpress;

export type ErrorRequestHandler = ErrorRequestHandlerExpress;
