import {
  Sequelize,
  ValidationError
} from "sequelize";

import config from '../config';

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PW,
  {
    dialect: "postgres",
    host: config.DB_HOST
  }
  );

export default sequelize;
