import { Request } from "express";
export interface RequestWithUser extends Request {
  body: {
    username: string;
    email: string;
    password: string;
    role: number;
  };
}
