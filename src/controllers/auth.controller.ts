import { RequestWhenLogin, Response, NextFunction } from '../types/express.types';
import Orm from '../utils/sequelize';
import Database from '../db';
import { getToken } from '../utils/jwt';
import { comparePassword } from '../utils/bcrypt';
import { responseStructure } from '../utils/response';

interface IControllers {
  path: string;
  handler: (req: RequestWhenLogin, res: Response, next: NextFunction) => void;
  method: 'post' | 'get' | 'put' | 'delete' | 'patch';
}

class classAuthControllers {
  private controllers: IControllers[] = [];

  constructor() {
    this.initializeControllers();
  }

  private async login(req: RequestWhenLogin, res: Response, next: NextFunction): Promise<any> {
    try {
      const model = Database.getModel('users');
      const user: any = await model.findOne({ where: { username: { [Orm.Op.iLike]: req.body.username } } });
      if (!user) return res.status(404).json(responseStructure(404, `Username incorrect`, {}));
      const isPasswordValid = await comparePassword(req.body.password, user.password);
      console.log(isPasswordValid);
      if (!isPasswordValid) return res.status(404).json(responseStructure(404, `Password incorrect`, {}));
      const token = getToken({});
      const dataUser = user.dataValues;
      delete dataUser.password;
      delete dataUser.createdAt;
      delete dataUser.updatedAt;
      return res.status(200).json(responseStructure(200, 'Succesfull Auth', { ...dataUser, access_token: token }));
    } catch (error: any) {
      next(error);
    }
  }

  private initializeControllers(): void {
    this.controllers = [{ path: '/login', method: 'post', handler: this.login }];
  }

  public getControlllers() {
    return this.controllers;
  }
}

export default classAuthControllers;
