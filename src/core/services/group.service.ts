import { GroupRepository } from "~/database/repos";
import GroupModel from "~/database/models/group.model";

export class GroupService {
  static create = async (name: string, desc: string) => {
    const match = await GroupRepository.findOne({
      where: {
        group_name: name,
      },
    });
    if (match) {
      return {
        success: false,
      };
    }

    const group = GroupRepository.create({
      group_name: name,
      group_desc: desc,
    });
    await GroupRepository.save(group);
    return {
      success: true,
    };
  };

  static getAll = async () => {
    return (await GroupRepository.find()).map((g) => GroupModel.toModel(g));
  };

  static delete = async (id: number) => {
    const match = await GroupRepository.findOne({
      where: {
        id,
      },
    });

    if (!match)
      return {
        success: false,
      };

    await GroupRepository.remove(match);
    return {
      success: true,
    };
  };
}