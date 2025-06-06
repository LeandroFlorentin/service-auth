import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize';
import { TypeModel } from '../interfaces/sequelize.types';

type UserAttributes = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: number;
  disabled: number;
};

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: string[];
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare disabled: number;
}

export default (sequelize: Sequelize): TypeModel => {
  return User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.JSON,
        defaultValue: ['ADMIN'],
      },
      disabled: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
    }
  );
};
