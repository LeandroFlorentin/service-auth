import {
  Request as RequestExpress,
  Response as ResponseExpress,
  NextFunction as NextFunctionExpress,
  ErrorRequestHandler as ErrorRequestHandlerExpress,
  Application as ApplicationExpress,
  Router as RouterExpress,
} from 'express';

export type Router = RouterExpress;

export type Application = ApplicationExpress;

interface IUser {
  user?: {
    username: string;
    role: string;
    email: string;
    id: number;
  };
}

export interface Request extends RequestExpress, IUser {
  body: {};
}

export interface RequestWhenAuth extends RequestExpress, IUser {
  headers: {
    authorization: string;
  };
}

export interface RequestWhenLogin extends RequestExpress {
  body: {
    username: string;
    password: string;
  };
}
export interface RequestWithUser extends RequestExpress, IUser {
  body: {
    username: string;
    email: string;
    password: string;
    role: number[];
  };
}

export type Response = ResponseExpress;

export type NextFunction = NextFunctionExpress;

export type ErrorRequestHandler = ErrorRequestHandlerExpress;
