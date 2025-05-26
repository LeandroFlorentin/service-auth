import { hashPassword } from '../utils/bcrypt';
import { responseStructure } from '../utils/response';
import { middlewareDecoded } from '../middlewares/decoded.middleware';
import { middlewareRoleAdmin, middlewareVerifyRoleUpdated } from '../middlewares/roles.middleware';
import { getDate } from '../utils/moment';
import { verifyEmail, verifyPassword } from '../utils/functions';
import CustomError from '../utils/customError';
import { Response, Request, RequestWithUser, NextFunction } from '../interfaces/express.types';
import { IClassController, IController } from '../interfaces/src/controllers';
import TYPES from '../inverfisy/types';
import { injectable, inject } from '../utils/inversify';
import { IDatabase } from '../interfaces/db.interface';

@injectable()
class classUserController implements IClassController {
  private middlewares = [middlewareDecoded];
  private model: string = 'users';
  private controllers: IController[] = [];

  constructor(@inject(TYPES.Database) private database: IDatabase) {
    this.createUser = this.createUser.bind(this);
    this.disabledUser = this.disabledUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.initializeControllers();
  }

  private createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body as RequestWithUser["body"];
      const UserModel = this.database.getModel(this.model);
      if (!UserModel) throw new CustomError('Model not found', 500);
      const emailVerify = verifyEmail(user.email);
      if (!emailVerify) throw new CustomError('Format email Invalid', 400);
      const passwordVerify = verifyPassword(user.password);
      if (!passwordVerify) {
        throw new CustomError('The password contains one letter, and one number and your longitude should 5 - 30 characters.', 400);
      }
      user.password = user.password && (await hashPassword(user?.password));
      const userCreate: any = await UserModel.create({ ...user });
      const { dataValues: values } = userCreate;
      delete values.password;
      delete values.createdAt;
      delete values.updatedAt;
      return res.status(200).json(responseStructure(200, `User ${user.username} is succesfull created`, { ...values }));
    } catch (error: any) {
      next(error);
    }
  };

  private getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;
      const UserModel = this.database.getModel(this.model);
      if (!UserModel) throw new CustomError('Model not found', 500);
      const user = await UserModel.findOne({ where: { id, disabled: 0 } });
      if (!user) throw new CustomError(`User not found { iduser: ${id} }`, 404);
      const { dataValues: values } = user;
      delete values.password;
      return res.status(200).json(responseStructure(200, 'Info OK', { ...values }));
    } catch (error) {
      next(error);
    }
  };

  private disabledUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;
      if (!id) throw new CustomError('Id not send in query params', 404);
      const UserModel = this.database.getModel(this.model);
      if (!UserModel) throw new CustomError('Model not found', 500);
      await UserModel.update({ disabled: 1, updatedAt: getDate() }, { where: { id } });
      return res.status(200).json(responseStructure(200, 'Succesfully delete user', {}));
    } catch (error) {
      next(error);
    }
  };

  private updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body as RequestWithUser["body"];
      const { id } = req.query;
      if (!id) throw new CustomError('Id not send in query params', 404);
      const UserModel = this.database.getModel(this.model);
      if (!UserModel) throw new CustomError('Model not found', 500);
      user.password = user.password && (await hashPassword(user?.password));
      await UserModel.update({ ...req.body, updatedAt: getDate() }, { where: { id } });
      return res.status(200).json(responseStructure(200, 'Succesfully upload user', {}));
    } catch (error) {
      next(error);
    }
  };

  private initializeControllers(): void {
    this.controllers = [
      { method: 'get', path: '/me', handler: this.getUser, middlewares: [...this.middlewares, middlewareVerifyRoleUpdated] },
      { method: 'post', path: '/create', handler: this.createUser, middlewares: [] },
      { method: 'delete', path: '/delete', handler: this.disabledUser, middlewares: [...this.middlewares, middlewareRoleAdmin] },
      { method: 'put', path: '/update', handler: this.updateUser, middlewares: [...this.middlewares, middlewareVerifyRoleUpdated] },
    ];
  }
  public getControllers(): IController[] {
    return this.controllers;
  }
}

export default classUserController;
