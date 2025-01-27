import { hashPassword } from '../utils/bcrypt';
import { RequestWithUser, Response, NextFunction } from '../types/express.types';
import { responseStructure } from '../utils/error';
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
      const model = 'users';
      const UserModel = Database.getModel(model);
      if (!UserModel) return res.status(500).json(responseStructure(500, 'Model not found', { model }));
      req.body.password = req.body.password && (await hashPassword(req.body?.password));
      const user: any = await UserModel.create(req.body);
      const { dataValues: values } = user;
      delete values.password;
      delete values.createdAt;
      delete values.updatedAt;
      return res.status(200).json(responseStructure(200, `User ${req.body.username} is succesfull created`, { ...values }));
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
