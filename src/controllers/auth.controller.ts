import { RequestWhenLogin, Response, NextFunction } from '../types/express.types';
import Orm from '../utils/sequelize';
import Database from '../db';
import { getToken } from '../utils/jwt';
import { comparePassword } from '../utils/bcrypt';
import { responseStructure } from '../utils/response';
import { verifyEmail } from '../utils/functions';
import CustomError from '../utils/customError';

interface IClassAuthController {
  getControllers(): IControllers[];
}

interface IControllers {
  path: string;
  handler: (req: RequestWhenLogin, res: Response, next: NextFunction) => void;
  method: 'post' | 'get' | 'put' | 'delete' | 'patch';
  middlewares?: ((req: any, res: Response, next: NextFunction) => void)[];
}

class classAuthControllers implements IClassAuthController {
  private controllers: IControllers[] = [];

  constructor() {
    this.login = this.login.bind(this);
    this.initializeControllers();
  }

  private login = async (req: RequestWhenLogin, res: Response, next: NextFunction) => {
    try {
      if (!req.body.username) throw new CustomError('Please enter a username', 400);
      if (!req.body.password) throw new CustomError('Please enter a password', 400)
      const obj: any = {};
      for (let key in req.body) {
        if (key !== 'password') {
          if (verifyEmail(req.body[key])) obj.email = { [Orm.Op.iLike]: req.body[key] };
          else obj[key] = { [Orm.Op.iLike]: req.body[key] };
        }
      }
      const model = Database.getModel('users');
      const user: any = await model.findOne({ where: { ...obj } });
      if (!user) throw new CustomError('Email or username incorrect', 404);
      const isPasswordValid = await comparePassword(req.body.password, user.password);
      if (!isPasswordValid) throw new CustomError('Password incorrect', 404);
      const dataUser = user.dataValues;
      delete dataUser.password;
      delete dataUser.createdAt;
      delete dataUser.updatedAt;
      if(typeof dataUser.role === "string") dataUser.role = JSON.parse(dataUser.role);
      const token = getToken(dataUser);
      return res.status(200).json(responseStructure(200, 'Succesfull Auth', { ...dataUser, access_token: token }));
    } catch (error: any) {
      console.log('Error: ', error);
      next(error);
    }
  };

  private initializeControllers(): void {
    this.controllers = [{ path: '/login', method: 'post', handler: this.login }];
  }

  public getControllers() {
    return this.controllers;
  }
}

export default classAuthControllers;
