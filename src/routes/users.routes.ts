import { Request, Response, RequestHandler } from "express";
interface IRoute {
  method: "post" | "get" | "put" | "delete" | "patch";
  path: string;
  handler: RequestHandler;
}

class RouteUsers {
  private static createUser(req: Request, res: Response) {}
  public static getRoutes(): IRoute[] {
    return [{ method: "post", path: "/create", handler: this.createUser }];
  }
}

export default RouteUsers;
