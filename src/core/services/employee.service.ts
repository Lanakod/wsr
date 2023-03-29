import { EmployeeRepository, GroupRepository } from "~/database/repos";
import EmployeeModel from "~/database/models/employee.model";

export interface UpdateEmployee {
  fio: string;
  email: string;
  phone: string;
  id_group: number;
  birth_date: string;
}

export class EmployeeService {
  static create = async (
    fio: string,
    email: string,
    phone: string,
    id_group: number,
    birth_date: string
  ) => {
    const match = await EmployeeRepository.findOne({
      where: [{ email }, { phone }],
    });
    const group = await GroupRepository.findOne({
      where: {
        id: id_group,
      },
    });
    if (match || !group) {
      return {
        success: false,
      };
    }

    const employee = EmployeeRepository.create({
      email,
      phone,
      fio,
      group,
      birth_date,
    });
    await EmployeeRepository.save(employee);
    return {
      success: true,
    };
  };

  static update = async (id: number, dto: UpdateEmployee) => {
    const user = await EmployeeRepository.findOne({
      where: {
        id: id,
      },
      relations: ["group"],
    });
    if (!user)
      return {
        success: false,
      };
    Object.keys(dto).forEach((one) => {
      // @ts-ignore
      user[one] = dto[one];
    });
    return EmployeeModel.toModel(await EmployeeRepository.save(user));
  };

  static delete = async (id: number) => {
    const match = await EmployeeRepository.findOne({
      where: {
        id,
      },
    });

    if (!match)
      return {
        success: false,
      };

    await EmployeeRepository.remove(match);
    return {
      success: true,
    };
  };

  static changeGroup = async (userId: number, groupId: number) => {
    const user = await EmployeeRepository.findOne({
      where: {
        id: userId,
      },
      relations: ["group"],
    });
    const group = await GroupRepository.findOne({
      where: {
        id: groupId,
      },
    });

    if (!user)
      return {
        success: false,
        message: "Employee not found",
      };
    if (!group)
      return {
        success: false,
        message: "Groups not found",
      };

    user.group = group;

    await EmployeeRepository.save(user);
    return {
      success: true,
    };
  };

  static getAll = async () => {
    const users = await EmployeeRepository.find({
      relations: ["group"],
    });

    return users.map((u) => EmployeeModel.toModel(u));
  };
}
