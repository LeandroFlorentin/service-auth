import Database from '../db';
import { hashPassword } from './bcrypt';

class UserPrueba {
  public static async createUser() {
    const body = {
      username: 'John doe',
      email: 'JohnDoe@hotmail.com',
      password: 'J123456',
    };
    body.password = await hashPassword(body.password);
    const model = 'users';
    const UserModel = Database.getModel(model);
    await UserModel.create(body);
  }
}

export default UserPrueba;
