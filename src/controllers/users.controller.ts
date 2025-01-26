import { Response } from "express";
import { hashPassword } from "../utils/bcrypt";
import { RequestWithUser } from "../types/express.types";
import Database from "../db";

interface IControllers {
  path: string;
  handler: (req: RequestWithUser, res: Response) => void;
  method: "post" | "get" | "put" | "delete" | "patch";
}

class classUserController {
  private controllers: IControllers[] = [];
  constructor() {
    this.initializeControllers();
  }
  private async createUser(req: RequestWithUser, res: Response) {
    try {
      const UserModel = Database.getModel("users");
      req.body.password = await hashPassword(req.body.password);
      const user = await UserModel.create(req.body);
      return res.status(201).json(user);
      //Create user logic for creating user
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  private initializeControllers(): void {
    this.controllers = [
      { method: "post", path: "/create", handler: this.createUser },
    ];
  }
  public getControllers(): IControllers[] {
    return this.controllers;
  }
}

export default classUserController;
