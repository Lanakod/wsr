import AppDataSource from "~/database";
import { EmployeeEntity } from "~/database/entities";

export default AppDataSource.getRepository(EmployeeEntity);