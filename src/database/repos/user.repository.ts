import AppDataSource from "~/database";
import { UserEntity } from "~/database/entities";

export default AppDataSource.getRepository(UserEntity);