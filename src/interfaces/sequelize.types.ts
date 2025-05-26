import { Sequelize, Model, ModelStatic, Op } from 'sequelize';
export type TypeSequelize = Sequelize;
export type TypeModel = ModelStatic<Model>;
export type TypeOp = typeof Op;
