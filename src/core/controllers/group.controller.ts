import { Request, Response } from "express";
import { GroupService } from "~/core/services/group.service";

export class GroupController {
  static create = async (req: Request, res: Response) => {
    const { group_name, group_desc } = req.body;
    if (!group_desc || !group_name)
      return res.status(400).json({
        message: "Bad request",
      });
    const data = await GroupService.create(group_name, group_desc);
    if (!data.success)
      return res.status(400).json({
        message: "Bad request",
      });

    return res.status(200).json({
      data: {
        message: "New group created",
      },
    });
  };

  static getAll = async (req: Request, res: Response) => {
    const data = await GroupService.getAll();
    return res.status(200).json({
      group_list: data,
    });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || !+id)
      return res.status(403).json({
        error: {
          message: "Group not found",
        },
      });

    const data = await GroupService.delete(+id);
    if (!data.success)
      return res.status(403).json({
        error: {
          message: "Group not found",
        },
      });

    return res.status(200).json({
      data: {
        message: "Group deleted",
      },
    });
  };
}