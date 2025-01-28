import { Router } from 'express';
import classAuthController from '../controllers/auth.controller';

class RoutesAuth {
  private router: Router = Router();
  private controllers = new classAuthController().getControlllers();

  public getRoutes(): Router {
    this.controllers.forEach((route) => this.router[route.method](`${route.path}`, route.handler));
    return this.router;
  }
}

export default RoutesAuth;
