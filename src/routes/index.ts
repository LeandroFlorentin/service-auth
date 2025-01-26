import { Router } from "express";
import UserRoutes from "./users.routes";

class Routes {
  private router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    UserRoutes.getRoutes().forEach((route) =>
      this.router[route.method](`/users${route.path}`, route.handler)
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export default Routes;
