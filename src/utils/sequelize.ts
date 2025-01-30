import { Sequelize, Dialect, Op as OpSequelize } from 'sequelize';
import { TypeOp } from '../types/sequelize.types';
const { DATABASE, USER, PASSWORD, HOST, DIALECT } = process.env;
const dialect = DIALECT as Dialect | undefined;

class Orm {
  private static instance: Sequelize;

  public static async getInstance(): Promise<Sequelize> {
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
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    return Orm.instance;
  }

  public static Op = OpSequelize;
}

export default Orm;
