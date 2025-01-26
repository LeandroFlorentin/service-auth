import { hashPassword } from '../utils/bcrypt';
import { RequestWithUser, Response, NextFunction } from '../types/express.types';
import { errorStructure } from '../utils/error';
import Database from '../db';

interface IControllers {
  path: string;
  handler: (req: RequestWithUser, res: Response, next: NextFunction) => void;
  method: 'post' | 'get' | 'put' | 'delete' | 'patch';
}

class classUserController {
  private controllers: IControllers[] = [];
  constructor() {
    this.initializeControllers();
  }
  private async createUser(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const UserModel = Database.getModel('users');
      if (!UserModel) return res.status(500).json(errorStructure(500, 'Model not found', 'DatabaseError'));
      req.body.password = req.body.password && (await hashPassword(req.body?.password));
      const user = await UserModel.create(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      next(error);
    }
  }
  private initializeControllers(): void {
    this.controllers = [{ method: 'post', path: '/create', handler: this.createUser }];
  }
  public getControllers(): IControllers[] {
    return this.controllers;
  }
}

export default classUserController;
