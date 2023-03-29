import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  CabinetEntity,
  EmployeeEntity,
  GroupEntity,
  UserEntity,
} from "~/database/entities";
import { config as DotEnvConfig } from "dotenv";
DotEnvConfig({
  path: ".env",
});

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.ORM_HOST,
  port: 3306,
  username: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DATABASE,
  entities: [UserEntity, GroupEntity, EmployeeEntity, CabinetEntity],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
