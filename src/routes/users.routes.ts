import classUserController from '../controllers/users.controller';
import { Router } from 'express';

interface IRouteUsers {
  getRoutes(): Router;
}

class RouteUsers implements IRouteUsers {
  private router: Router = Router();
  private controllers = new classUserController().getControllers();

  public getRoutes(): Router {
    this.controllers.forEach((route) => {
      console.log(`Registering route: [${route.method.toUpperCase()}] ${route.path}`);
      const middlewares = route.middlewares || [];
      this.router[route.method](`${route.path}`, ...middlewares, route.handler);
    });
    return this.router;
  }
}

export default RouteUsers;
