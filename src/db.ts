import { TypeSequelize, TypeModel } from "./types/sequelize.types";
import Orm from "./utils/sequelize";
import Models from "./models/index";

interface IModelsReturn {
  [key: string]: TypeModel;
}

class Database {
  private static models: IModelsReturn = {};

  static async connect() {
    const sequelize = await Orm.getInstance();
    await this.syncModels(sequelize);
  }
  private static async syncModels(sequelize: TypeSequelize): Promise<void> {
    const models: { [key: string]: (sequelize: TypeSequelize) => TypeModel } =
      Models;
    for (const model in models) {
      Database.models[model] = models[model](sequelize);
    }
  }
  static getModel(modelName: string) {
    return Database.models[modelName];
  }
}

export default Database;
