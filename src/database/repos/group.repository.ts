import AppDataSource from "~/database";
import { GroupEntity } from "~/database/entities/group.entity";

export default AppDataSource.getRepository(GroupEntity);