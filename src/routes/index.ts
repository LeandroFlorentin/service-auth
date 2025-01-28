import { Router } from 'express';
import UserRoutes from './users.routes';
import AuthRoutes from './auth.routes';

class Routes {
  private router: Router = Router();
  private userRoutes = new UserRoutes();
  private authRoutes = new AuthRoutes();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use('/users', this.userRoutes.getRoutes());
    this.router.use('/auth', this.authRoutes.getRoutes());
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export default Routes;
