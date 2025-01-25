import { RequestHandler, Response, Request } from "express";
import Database from "../db";

interface IControllers {
  path: string;
  handler: RequestHandler;
  method: "post" | "get" | "put" | "delete" | "patch";
}

class classUserController {
  private controllers: IControllers[] = [];
  constructor() {
    this.initializeControllers();
  }
  private async createUser(req: Request, res: Response) {
    try {
      await Database.connect();
      const User = Database.getModel("users");
      //Create user logic
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  public initializeControllers(): void {
    this.controllers = [
      { method: "post", path: "/create", handler: this.createUser },
    ];
  }
}

export default classUserController;
