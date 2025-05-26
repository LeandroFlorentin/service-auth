import { TypeSequelize } from './sequelize.types';

export interface IApp {
  listen(port: number): void;
  connectDatabase(): Promise<TypeSequelize>;
}
