import { Container } from '../utils/inversify';
import TYPES from './types';
import { IRoutes } from '../interfaces/src/routes';
import { IApp } from '../interfaces/app.interface';
import { IDatabase } from '../interfaces/db.interface';
import { IClassController } from '../interfaces/src/controllers/index';
import Routes from '../routes/index';
import App from '../app';
import Database from '../db';
import classAuthControllers from '../controllers/auth.controller';
import classUserController from '../controllers/users.controller';
import RoutesUsers from '../routes/users.routes';
import RoutesAuth from '../routes/auth.routes';
import Orm, { IOrm } from '../utils/sequelize';
import UserPrueba, { IUserPrueba } from '../utils/user';

const container = new Container();
container.bind<IRoutes>(TYPES.Routes).to(Routes);
container.bind<IApp>(TYPES.App).to(App);
container.bind<IDatabase>(TYPES.Database).to(Database);
container.bind<IClassController>(TYPES.AuthController).to(classAuthControllers);
container.bind<IClassController>(TYPES.UserController).to(classUserController);
container.bind<IRoutes>(TYPES.RoutesUsers).to(RoutesUsers);
container.bind<IRoutes>(TYPES.RoutesAuth).to(RoutesAuth);
container.bind<IOrm>(TYPES.Orm).to(Orm);
container.bind<IUserPrueba>(TYPES.UserPrueba).to(UserPrueba);

export { container, TYPES as types };
