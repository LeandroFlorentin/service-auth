import { Router } from 'express';
import classAuthController from '../controllers/auth.controller';

interface IRoutesAuth {
  getRoutes(): Router;
}

class RoutesAuth implements IRoutesAuth {
  private router: Router = Router();
  private controllers = new classAuthController().getControllers();

  public getRoutes(): Router {
    this.controllers.forEach((route) => {
      const middlewares = route.middlewares || [];
      this.router[route.method](`${route.path}`, ...middlewares, route.handler);
    });
    return this.router;
  }
}

export default RoutesAuth;
