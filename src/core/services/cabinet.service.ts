import { CabinetRepository, GroupRepository } from "~/database/repos";
import GroupModel from "~/database/models/group.model";
import CabinetModel from "~/database/models/cabinet.model";

export class CabinetService {
  static create = async (name: string, number: number) => {
    const match = await CabinetRepository.findOne({
      where: {
        name,
      },
    });
    if (match) {
      return {
        success: false,
      };
    }

    const cabinet = CabinetRepository.create({
      name,
      number,
    });
    return {
      success: true,
      cabinet: CabinetModel.toModel(await CabinetRepository.save(cabinet)),
    };
  };

  static getAll = async () => {
    return (await CabinetRepository.find()).map((c) => CabinetModel.toModel(c));
  };

  static getEverything = async () => {
    return (
      await CabinetRepository.find({
        relations: ["groups", "groups.employees"],
      })
    ).map((c) => CabinetModel.toModel(c));
  };

  static delete = async (id: number) => {
    const match = await CabinetRepository.findOne({
      where: {
        id,
      },
    });

    if (!match)
      return {
        success: false,
      };

    await CabinetRepository.remove(match);
    return {
      success: true,
    };
  };

  static addGroup = async (cabinetId: number, groupId: number) => {
    const cabinet = await CabinetRepository.findOne({
      where: {
        id: cabinetId,
      },
    });
    const group = await GroupRepository.findOne({
      where: {
        id: groupId,
      },
    });

    if (!cabinet)
      return {
        success: false,
        message: "Cabinet not found",
      };

    if (!group)
      return {
        success: false,
        message: "Groups not found",
      };

    if (cabinet.groups) cabinet.groups = [...cabinet.groups, group];
    else cabinet.groups = [group];

    await CabinetRepository.save(cabinet);
    return {
      success: true,
      res: {
        name: cabinet.name,
        number: cabinet.number,
        name_group: group.group_name,
      },
    };
  };
}
