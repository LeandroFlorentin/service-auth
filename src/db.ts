import { TypeSequelize, TypeModel } from './interfaces/sequelize.types';
import {IOrm} from './utils/sequelize';
import Models from './models/index';
import { IModelsReturn, IDatabase } from './interfaces/db.interface';
import { injectable,inject } from './utils/inversify';
import TYPES from './inverfisy/types';

@injectable()
class Database implements IDatabase {
  private static models: IModelsReturn = {};

  constructor(@inject(TYPES.Orm) private Orm: IOrm) {
    if (!Database.models) {
      Database.models = {};
    }

  }

  public async connect(): Promise<TypeSequelize> {
    const sequelize = await this.Orm.getInstance();
    await this.syncModels(sequelize);
    return sequelize;
  }
  private async syncModels(sequelize: TypeSequelize): Promise<void> {
    const models: { [key: string]: (sequelize: TypeSequelize) => TypeModel } = Models;
    for (const model in models) {
      Database.models[model] = models[model](sequelize);
    }
  }
  public getModel(modelName: string) {
    return Database.models[modelName];
  }
}

export default Database;
