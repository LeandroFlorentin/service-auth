import { Request, NextFunction, Response } from '../../express.types';

export interface IClassController {
  getControllers(): IController[];
}

export interface IController {
  path: string;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  method: 'post' | 'get' | 'put' | 'delete' | 'patch';
  middlewares?: ((req: any, res: Response, next: NextFunction) => void)[];
}
