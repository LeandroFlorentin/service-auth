import { IRoutes } from '../interfaces/src/routes/index';
import { Router } from 'express';
import { injectable, inject } from '../utils/inversify';
import { IClassController } from '../interfaces/src/controllers/index';
import TYPES from '../inverfisy/types';

@injectable()
class RoutesUsers implements IRoutes {
  private router: Router = Router();
  constructor(@inject(TYPES.UserController) private userController: IClassController) {}

  public getRoutes(): Router {
    const controllers = this.userController.getControllers();
    controllers.forEach((route) => {
      const middlewares = route.middlewares || [];
      this.router[route.method](`${route.path}`, ...middlewares, route.handler);
    });
    return this.router;
  }
}

export default RoutesUsers;
