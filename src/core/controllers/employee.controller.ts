import { Request, Response } from "express";
import { EmployeeService } from "~/core/services/employee.service";

export class EmployeeController {
  static create = async (req: Request, res: Response) => {
    const { fio, email, phone, id_group, birth_date } = req.body;
    if (!fio || !email || !phone || !id_group || !birth_date)
      return res.status(400).json({
        message: "Bad request",
      });
    const data = await EmployeeService.create(
      fio,
      email,
      phone,
      id_group,
      birth_date
    );
    if (!data.success)
      return res.status(400).json({
        message: "Bad request",
      });

    return res.status(200).json({
      data: {
        message: "Employee created",
      },
    });
  };

  static update = async (req: Request, res: Response) => {
    const { fio, email, phone, id_group, birth_date } = req.body;
    const { id } = req.params;
    if (!id)
      return res.status(404).json({
        message: "Employee not found",
      });
    const data = await EmployeeService.update(+id, {
      fio,
      email,
      phone,
      id_group,
      birth_date,
    });
    return res.status(200).json({
      group_list: data,
    });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || !+id)
      return res.status(403).json({
        error: {
          message: "Employee not found",
        },
      });

    const data = await EmployeeService.delete(+id);
    if (!data.success)
      return res.status(403).json({
        error: {
          message: "Employee not found",
        },
      });

    return res.status(200).json({
      data: {
        message: "Employee deleted",
      },
    });
  };

  static changeGroup = async (req: Request, res: Response) => {
    const { userId, groupId } = req.params;
    if (!userId || !+userId || !groupId || !+groupId)
      return res.status(400).json({
        error: {
          message: "Bad request",
        },
      });

    const data = await EmployeeService.changeGroup(+userId, +groupId);
    if (!data.success)
      return res.status(403).json({
        error: {
          message: data.message,
        },
      });

    return res.status(200).json({
      data: {
        id_employee: userId,
        id_group: groupId,
        message: "Group has been changed",
      },
    });
  };

  static getAll = async (req: Request, res: Response) => {
    const data = await EmployeeService.getAll();
    return res.status(200).json({
      data,
    });
  };
}
