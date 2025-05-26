import { TypeModel, TypeSequelize } from './sequelize.types';

export interface IModelsReturn {
  [key: string]: TypeModel;
}

export interface IDatabase {
  connect(): Promise<TypeSequelize>;
  getModel(modelName: string): TypeModel | null;
}
