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

export interface RequestWhenLogin extends RequestExpress {
  body: {
    username: string;
    password: string;
  };
}
export interface RequestWithUser extends RequestExpress {
  body: {
    username: string;
    email: string;
    password: string;
    role: number[];
  };
}

export type Request = RequestExpress;

export type Response = ResponseExpress;

export type NextFunction = NextFunctionExpress;

export type ErrorRequestHandler = ErrorRequestHandlerExpress;
