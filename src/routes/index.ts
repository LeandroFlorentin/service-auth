import { Router } from 'express';
import RoutesUsers from './users.routes';
import AuthRoutes from './auth.routes';
import { IRoutes } from '../interfaces/src/routes/index';
import { injectable, inject } from '../utils/inversify';
import TYPES from '../inverfisy/types';

@injectable()
class Routes implements IRoutes {
  private router: Router = Router();

  constructor(@inject(TYPES.RoutesUsers) private userRoutes: IRoutes,@inject(TYPES.RoutesAuth) private authRoutes: IRoutes) {
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
