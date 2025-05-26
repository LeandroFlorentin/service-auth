import { injectable } from '../utils/inversify';
import { Sequelize, Dialect, Op as OpSequelize } from 'sequelize';
const { DATABASE, USER, PASSWORD, HOST, DIALECT } = process.env;
const dialect = DIALECT as Dialect | undefined;

export interface IOrm{
  getInstance(): Promise<Sequelize>;
  Op: typeof OpSequelize;
}

@injectable()
class Orm implements IOrm {
  private static instance: Sequelize;

  public async getInstance() {
    try {
      if (!Orm.instance) {
        if (!DIALECT || !['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql', 'db2', 'snowflake', 'oracle'].includes(DIALECT)) {
          throw new Error(
            `The dialec (DIALECT) is not valid. To owe be one of the: mysql, postgres, sqlite, mariadb, mssql, db2, snowflake, oracle.`
          );
        }
        Orm.instance = new Sequelize(`${DATABASE}` as string, `${USER}` as string, `${PASSWORD}` as string, {
          host: `${HOST}` as string,
          dialect: dialect,
        });
      }
      await Orm.instance.authenticate();

      console.log('Connection has been established successfully.');
    } catch (error: any) {
      console.error('Unable to connect to the database:', error);
      throw new Error(error);
    }
    return Orm.instance;
  }

  public Op = OpSequelize;
}

export default Orm;
