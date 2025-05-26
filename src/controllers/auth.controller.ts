import { RequestWhenLogin, Response, NextFunction, Request } from '../interfaces/express.types';
import { getToken } from '../utils/jwt';
import { comparePassword } from '../utils/bcrypt';
import { responseStructure } from '../utils/response';
import { verifyEmail } from '../utils/functions';
import CustomError from '../utils/customError';
import { IClassController, IController } from '../interfaces/src/controllers/index';
import { injectable, inject } from '../utils/inversify';
import TYPES from '../inverfisy/types';
import { IDatabase } from '../interfaces/db.interface';
import { IOrm } from '../utils/sequelize';

@injectable()
class classAuthControllers implements IClassController {
  private controllers: IController[] = [];
  private model: string = 'users';

  constructor(@inject(TYPES.Database) private database: IDatabase,@inject(TYPES.Orm) private Orm: IOrm) {
    this.login = this.login.bind(this);
    this.initializeControllers();
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as RequestWhenLogin['body']
      if (!body.username) throw new CustomError('Please enter a username', 400);
      if (!body.password) throw new CustomError('Please enter a password', 400);
      const obj: any = {};
      for (let key in body) {
        if (key !== 'password') {
          if (verifyEmail(body[key])) obj.email = { [this.Orm.Op.iLike]: body[key] };
          else obj[key] = { [this.Orm.Op.iLike]: body[key] };
        }
      }
      const model = this.database.getModel(this.model);
      if (!model) throw new CustomError('Model not found' + model, 500);
      const user: any = await model.findOne({ where: { ...obj } });
      if (!user) throw new CustomError('Email or username incorrect', 404);
      const isPasswordValid = await comparePassword(body.password, user.password);
      if (!isPasswordValid) throw new CustomError('Password incorrect', 404);
      const dataUser = user.dataValues;
      delete dataUser.password;
      delete dataUser.createdAt;
      delete dataUser.updatedAt;
      if (typeof dataUser.role === 'string') dataUser.role = JSON.parse(dataUser.role);
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

  public getControllers(): IController[] {
    return this.controllers;
  }
}

export default classAuthControllers;
