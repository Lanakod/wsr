import GroupModel from "~/database/models/group.model";
import { CabinetEntity } from "~/database/entities/cabinet.entity";

export default class CabinetModel {
  private id: number;
  private name: string;
  private number: number;
  private groups: GroupModel[];

  get Id(): number {
    return this.id;
  }

  set Id(value: number) {
    this.id = value;
  }

  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
  }

  get Number(): number {
    return this.number;
  }
  set Number(value: number) {
    this.number = value;
  }

  get Groups(): GroupModel[] {
    return this.groups;
  }
  set Groups(value: GroupModel[]) {
    this.groups = value;
  }

  static toModel(cabinet: CabinetEntity) {
    const model = new CabinetModel();

    model.Id = cabinet.id;
    model.Number = cabinet.number;
    model.Name = cabinet.name;
    if (cabinet.groups)
      model.Groups = cabinet.groups.map((g) => GroupModel.toModel(g));

    return model;
  }
}
