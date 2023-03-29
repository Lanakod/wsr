import { EmployeeEntity } from "~/database/entities";

export default class EmployeeModel {
  private id: number;

  private fio: string;

  private phonenumber: string;

  private group_id: number;
  private group_name: string;

  get Id(): number {
    return this.id;
  }

  set Id(value: number) {
    this.id = value;
  }

  get Fio(): string {
    return this.fio;
  }

  set Fio(value: string) {
    this.fio = value;
  }

  get Phonenumber(): string {
    return this.phonenumber;
  }

  set Phonenumber(value: string) {
    this.phonenumber = value;
  }

  get Group_id(): number {
    return this.group_id;
  }

  set Group_id(value: number) {
    this.group_id = value;
  }

  get Group_name(): string {
    return this.group_name;
  }

  set Group_name(value: string) {
    this.group_name = value;
  }

  static toModel(employee: EmployeeEntity) {
    const model = new EmployeeModel();

    model.Id = employee.id;
    if (employee.group) {
      model.Group_id = employee.group.id;
      model.Group_name = employee.group.group_name;
    }
    model.Fio = employee.fio;
    model.Phonenumber = employee.phone;

    return model;
  }
}
