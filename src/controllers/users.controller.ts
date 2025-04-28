import { hashPassword } from '../utils/bcrypt';
import { RequestWithUser, Response, NextFunction, Request } from '../types/express.types';
import { responseStructure } from '../utils/response';
import Database from '../db';
import { middlewareDecoded } from '../middlewares/decoded.middleware';
import { middlewareRoleAdmin, middlewareVerifyRoleUpdated } from '../middlewares/roles.middleware';
import { getDate } from '../utils/moment';
import { verifyEmail, verifyPassword } from '../utils/functions';
import CustomError from '../utils/customError';

interface IClassUserController {
  getControllers(): IControllers[];
}

interface IControllers {
  path: string;
  handler: (req: RequestWithUser, res: Response, next: NextFunction) => void;
  method: 'post' | 'get' | 'put' | 'delete' | 'patch';
  middlewares?: ((req: any, res: Response, next: NextFunction) => void)[];
}

class classUserController implements IClassUserController {
  private middlewares = [middlewareDecoded];
  private model: string = 'users';
  private controllers: IControllers[] = [];

  constructor() {
    this.createUser = this.createUser.bind(this);
    this.disabledUser = this.disabledUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.initializeControllers();
  }

  private createUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user!;
      const UserModel = Database.getModel(this.model);
      if (!UserModel) throw new CustomError('Model not found', 500);
      const emailVerify = verifyEmail(req.body.email);
      if (!emailVerify) throw new CustomError('Format email Invalid', 400);
      const passwordVerify = verifyPassword(req.body.password);
      if (!passwordVerify) {
        throw new CustomError('The password contains one letter, and one number and your longitude should 5 - 30 characters.', 400);
      }
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
      const { id } = req.query;
      const UserModel = Database.getModel(this.model);
      if (!UserModel) throw new CustomError('Model not found', 500);
      const user = await UserModel.findOne({ where: { id, disabled: 0 } });
      if (!user) throw new CustomError(`User not found { iduser: id }`,404)
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
      const { id } = req.query;
      if (!id) throw new CustomError('Id not send in query params', 404);
      const UserModel = Database.getModel(this.model);
      if (!UserModel) throw new CustomError('Model not found', 500);
      await UserModel.update({ disabled: 1, updatedAt: getDate() }, { where: { id } });
      return res.status(200).json(responseStructure(200, 'Succesfully delete user', {}));
    } catch (error) {
      next(error);
    }
  };

  private updateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;
      if (!id) throw new CustomError('Id not send in query params', 404);
      const UserModel = Database.getModel(this.model);
      if (!UserModel) throw new CustomError('Model not found', 500);
      req.body.password = req.body.password && (await hashPassword(req.body?.password));
      await UserModel.update({ ...req.body, updatedAt: getDate() }, { where: { id } });
      return res.status(200).json(responseStructure(200, 'Succesfully upload user', {}));
    } catch (error) {
      next(error);
    }
  };

  private initializeControllers(): void {
    this.controllers = [
      { method: 'get', path: '/me', handler: this.getUser, middlewares: [...this.middlewares, middlewareVerifyRoleUpdated] },
      { method: 'post', path: '/create', handler: this.createUser, middlewares: [...this.middlewares, middlewareRoleAdmin] },
      { method: 'delete', path: '/delete', handler: this.disabledUser, middlewares: [...this.middlewares, middlewareRoleAdmin] },
      { method: 'put', path: '/update', handler: this.updateUser, middlewares: [...this.middlewares, middlewareVerifyRoleUpdated] },
    ];
  }
  public getControllers(): IControllers[] {
    return this.controllers;
  }
}

export default classUserController;
