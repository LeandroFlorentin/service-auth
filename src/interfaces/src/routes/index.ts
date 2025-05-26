import { Router, RequestHandler } from 'express';
export interface IRoutes {
  getRoutes(): Router;
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface IRouteController {
  method: HttpMethod;
  path: string;
  middlewares?: RequestHandler[];
  handler: RequestHandler;
}
