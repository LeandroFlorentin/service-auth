import classUserController from "../controllers/users.controller";

class RouteUsers {
  private static controllers = new classUserController().getControllers();

  public static getRoutes() {
    return this.controllers;
  }
}

export default RouteUsers;
