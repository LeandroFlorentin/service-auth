import classUserController from '../controllers/users.controller';
import { Router } from 'express';

class RouteUsers {
  private router: Router = Router();
  private controllers = new classUserController().getControllers();

  public getRoutes(): Router {
    this.controllers.forEach((route) => {
      const middlewares = route.middlewares || [];
      this.router[route.method](`${route.path}`, ...middlewares, route.handler);
    });
    return this.router;
  }
}

export default RouteUsers;
