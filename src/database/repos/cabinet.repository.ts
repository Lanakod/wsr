import AppDataSource from "~/database";
import { CabinetEntity } from "~/database/entities/cabinet.entity";

export default AppDataSource.getRepository(CabinetEntity);
