import { GroupEntity } from "~/database/entities";
import EmployeeModel from "~/database/models/employee.model";

export default class GroupModel {
  private id: number;
  private group_name: string;
  private group_desc: string;
  private employees: EmployeeModel[];

  get Id(): number {
    return this.id;
  }

  set Id(value: number) {
    this.id = value;
  }

  get Group_name(): string {
    return this.group_name;
  }

  set Group_name(value: string) {
    this.group_name = value;
  }

  get Group_desc(): string {
    return this.group_desc;
  }

  set Group_desc(value: string) {
    this.group_desc = value;
  }

  get Employees(): EmployeeModel[] {
    return this.employees;
  }
  set Employees(value: EmployeeModel[]) {
    this.employees = value;
  }

  static toModel(group: GroupEntity) {
    const model = new GroupModel();

    model.Id = group.id;
    model.Group_name = group.group_name;
    model.Group_desc = group.group_desc;

    if (group.employees)
      model.Employees = group.employees.map((e) => EmployeeModel.toModel(e));

    return model;
  }
}
