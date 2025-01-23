import { TypeSequelize } from "./types/sequelize.types";
import Orm from "./utils/sequelize";
import Models from "./models/index";

interface IModelsReturn {
  [key: string]: any;
}

class Database {
  private static models: IModelsReturn = {};
  constructor() {
    this.syncModels();
    this.connect();
  }
  private async connect() {
    return await Orm.getInstance();
  }
  private async syncModels(): Promise<void> {
    const sequelize = await this.connect();
    const models: { [key: string]: (sequelize: TypeSequelize) => void } =
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
