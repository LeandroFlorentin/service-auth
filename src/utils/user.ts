import Database from '../db';
import { hashPassword } from './bcrypt';
import TYPES from '../inverfisy/types';
import { injectable, inject } from '../utils/inversify';

export interface IUserPrueba {
  createUser(): Promise<void>;
}
@injectable()
class UserPrueba implements IUserPrueba {
  private model: string = 'users';
  constructor(@inject(TYPES.Database) private database: Database) {}
  public async createUser() {
    const body = {
      username: 'John doe',
      email: 'JohnDoe@hotmail.com',
      password: 'J123456',
    };
    body.password = await hashPassword(body.password);
    const UserModel = this.database.getModel(this.model);
    await UserModel.create(body);
  }
}

export default UserPrueba;
