import { Router } from 'express';
import RouteUsers from './users.routes';
import AuthRoutes from './auth.routes';

interface IRoutes {
  getRoutes(): Router;
}

class Routes implements IRoutes {
  private router: Router = Router();
  private userRoutes = new RouteUsers();
  private authRoutes = new AuthRoutes();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use('/auth', this.authRoutes.getRoutes());
    this.router.use('/users', this.userRoutes.getRoutes());
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export default Routes;
