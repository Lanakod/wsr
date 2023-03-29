import { Request, Response } from "express";
import { GroupService } from "~/core/services/group.service";
import { CabinetService } from "~/core/services";

export class CabinetController {
  static create = async (req: Request, res: Response) => {
    const { name, number } = req.body;
    if (!name || !number)
      return res.status(400).json({
        message: "Bad request",
      });
    const data = await CabinetService.create(name, number);
    if (!data.success)
      return res.status(400).json({
        message: "Bad request",
      });

    return res.status(200).json({
      data: data.cabinet,
    });
  };

  static getAll = async (req: Request, res: Response) => {
    const data = await CabinetService.getAll();
    return res.status(200).json({
      cabinet_list: data,
    });
  };

  static getEverything = async (req: Request, res: Response) => {
    const data = await CabinetService.getEverything();
    return res.status(200).json({
      cabinets: data,
    });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || !+id)
      return res.status(403).json({
        error: {
          message: "Cabinet not found",
        },
      });

    const data = await CabinetService.delete(+id);
    if (!data.success)
      return res.status(403).json({
        error: {
          message: "Cabinet not found",
        },
      });

    return res.status(200).json({
      data: {
        message: "Cabinet removed from system",
      },
    });
  };

  static addGroup = async (req: Request, res: Response) => {
    const { cabinetId, groupId } = req.params;
    if (!cabinetId || !+cabinetId || !groupId || !+groupId)
      return res.status(400).json({
        error: {
          message: "Bad request",
        },
      });

    const data = await CabinetService.addGroup(+cabinetId, +groupId);
    if (!data.success)
      return res.status(403).json({
        error: {
          message: data.message,
        },
      });

    return res.status(200).json({
      data: data.res,
    });
  };
}
