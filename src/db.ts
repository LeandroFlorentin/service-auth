import { Dialect, Sequelize } from "sequelize";
const { DATABASE, USERNAME, PASSWORD, HOST, DIALECT } = process.env;
const dialect = DIALECT as Dialect | undefined;

const sequelize = new Sequelize(`${DATABASE}`, `${USERNAME}`, `${PASSWORD}`, {
  host: `${HOST}`,
  dialect: dialect,
});

export default sequelize;
