import { RequestWhenLogin, Response, NextFunction } from '../types/express.types';
import Orm from '../utils/sequelize';
import Database from '../db';
import { getToken } from '../utils/jwt';
import { comparePassword } from '../utils/bcrypt';
import { responseStructure } from '../utils/response';

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
      const model = Database.getModel('users');
      const user: any = await model.findOne({ where: { username: { [Orm.Op.iLike]: req.body.username } } });
      if (!user) return res.status(404).json(responseStructure(404, `Username incorrect`, {}));
      const isPasswordValid = await comparePassword(req.body.password, user.password);
      if (!isPasswordValid) return res.status(404).json(responseStructure(404, `Password incorrect`, {}));
      const dataUser = user.dataValues;
      delete dataUser.password;
      delete dataUser.createdAt;
      delete dataUser.updatedAt;
      dataUser.role = JSON.parse(dataUser.role);
      const token = getToken(dataUser);
      return res.status(200).json(responseStructure(200, 'Succesfull Auth', { ...dataUser, access_token: token }));
    } catch (error: any) {
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
