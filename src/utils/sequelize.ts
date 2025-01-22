import { Sequelize, Dialect } from "sequelize";
const { DATABASE, USERNAME, PASSWORD, HOST, DIALECT } = process.env;
const dialect = DIALECT as Dialect | undefined;

class Orm {
  private static instance: Sequelize;
  public static async getInstance(): Promise<Sequelize> {
    try {
      if (!Orm.instance) {
        if (
          !DIALECT ||
          ![
            "mysql",
            "postgres",
            "sqlite",
            "mariadb",
            "mssql",
            "db2",
            "snowflake",
            "oracle",
          ].includes(DIALECT)
        ) {
          throw new Error(
            `The dialec (DIALECT) is not valid. To owe be one of the: mysql, postgres, sqlite, mariadb, mssql, db2, snowflake, oracle.`
          );
        }
        Orm.instance = new Sequelize(
          `${DATABASE}`,
          `${USERNAME}`,
          `${PASSWORD}`,
          {
            host: `${HOST}`,
            dialect: dialect,
          }
        );
      }
      await Orm.instance.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
    return Orm.instance;
  }
}
