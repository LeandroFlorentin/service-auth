import { container, types } from '../inverfisy/inversify.config';
import { IDatabase } from '../interfaces/db.interface';
import { hashPassword } from '../utils/bcrypt';

export async function createTestUser() {
  const dbInstance = container.get<IDatabase>(types.Database);
  await dbInstance.connect();
  const UserModel:any = dbInstance.getModel('users');
  const exists = await UserModel.findOne({ where: { username: "John doe" } });
  if (!exists) {
    await UserModel.create({
      username: "John doe",
      email: "JohnDoe@hotmail.com",
      password: await hashPassword("J123456"),
      role: ["ADMIN"],
      disabled: 0
    });
  }
}