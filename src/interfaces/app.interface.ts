import { TypeSequelize } from './sequelize.types';
import { Application } from 'express';

export interface IApp {
  listen(port: number): void;
  connectDatabase(): Promise<TypeSequelize>;
  getApp(): Application
}
