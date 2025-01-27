import classUserController from '../controllers/users.controller';
import { Router } from 'express';

class RouteUsers {
  private router: Router = Router();
  private controllers = new classUserController().getControllers();

  public getRoutes(): Router {
    this.controllers.forEach((route) => this.router[route.method](`${route.path}`, route.handler));
    return this.router;
  }
}

export default RouteUsers;
