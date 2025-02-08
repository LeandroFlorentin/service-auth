import { hashPassword } from '../utils/bcrypt';
import { RequestWithUser, Response, NextFunction, Request } from '../types/express.types';
import { responseStructure } from '../utils/response';
import Database from '../db';
import { middlewareDecoded } from '../middlewares/decoded.middleware';
import { getDate } from '../utils/moment';

interface IControllers {
  path: string;
  handler: (req: RequestWithUser, res: Response, next: NextFunction) => void;
  method: 'post' | 'get' | 'put' | 'delete' | 'patch';
  middlewares?: ((req: any, res: Response, next: NextFunction) => void)[];
}

class classUserController {
  private middlewares = [middlewareDecoded];
  private model: string = 'users';
  private controllers: IControllers[] = [];

  constructor() {
    this.initializeControllers();
  }

  private createUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const UserModel = Database.getModel(this.model);
      if (!UserModel) return res.status(500).json(responseStructure(500, 'Model not found', { model: this.model }));
      req.body.password = req.body.password && (await hashPassword(req.body?.password));
      const user: any = await UserModel.create({ ...req.body, role: JSON.stringify(req.body.role) });
      const { dataValues: values } = user;
      delete values.password;
      delete values.createdAt;
      delete values.updatedAt;
      values.role = JSON.parse(values.role);
      return res.status(200).json(responseStructure(200, `User ${req.body.username} is succesfull created`, { ...values }));
    } catch (error: any) {
      next(error);
    }
  };

  private getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user!;
      const UserModel = Database.getModel(this.model);
      if (!UserModel) return res.status(500).json(responseStructure(500, 'Model not found', { model: this.model }));
      const user = await UserModel.findOne({ where: { id, disabled: 0 } });
      if (!user) return res.status(404).json(responseStructure(404, 'User not found', { iduser: id }));
      const { dataValues: values } = user;
      delete values.password;
      values.role = JSON.parse(values.role);
      return res.status(200).json(responseStructure(200, 'Info OK', { ...values }));
    } catch (error) {
      next(error);
    }
  };

  private disabledUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user!;
      const UserModel = Database.getModel(this.model);
      if (!UserModel) return res.status(500).json(responseStructure(500, 'Model not found', { model: this.model }));
      const userDeleted = await UserModel.update({ disabled: 1, updatedAt: getDate() }, { where: { id } });
      return res.status(200).json(responseStructure(200, 'Succesfully delete user', { ...userDeleted }));
    } catch (error) {
      next(error);
    }
  };

  private updateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user!;
      const UserModel = Database.getModel(this.model);
      if (!UserModel) return res.status(500).json(responseStructure(500, 'Model not found', { model: this.model }));
      const updatedUser = await UserModel.update({ ...req.body, updatedAt: getDate() }, { where: { id } });
      return res.status(200).json(responseStructure(200, 'Succesfully upload user', { ...updatedUser }));
    } catch (error) {
      next(error);
    }
  };

  private initializeControllers(): void {
    this.controllers = [
      { method: 'get', path: '/me', handler: this.getUser, middlewares: [...this.middlewares] },
      { method: 'post', path: '/create', handler: this.createUser, middlewares: [...this.middlewares] },
      { method: 'delete', path: '/delete', handler: this.disabledUser, middlewares: [...this.middlewares] },
      { method: 'put', path: '/update', handler: this.updateUser, middlewares: [...this.middlewares] },
    ];
  }
  public getControllers(): IControllers[] {
    return this.controllers;
  }
}

export default classUserController;
