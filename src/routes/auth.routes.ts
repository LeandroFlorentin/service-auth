import { Router } from 'express';
import { IRoutes } from '../interfaces/src/routes/index';
import { injectable, inject } from '../utils/inversify';
import { IClassController } from '../interfaces/src/controllers/index';
import TYPES from '../inverfisy/types';

@injectable()
class RoutesAuth implements IRoutes {
  private router: Router = Router();
  constructor(@inject(TYPES.AuthController) private authController: IClassController) {}
  public getRoutes(): Router {
    const controllers = this.authController.getControllers();
    controllers.forEach((route) => {
      const middlewares = route.middlewares || [];
      this.router[route.method](`${route.path}`, ...middlewares, route.handler);
    });
    return this.router;
  }
}

export default RoutesAuth;
