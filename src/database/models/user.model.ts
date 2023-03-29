import { UserEntity } from "~/database/entities";

export default class UserModel {
  private id: number;
  private username: string;

  get Id(): number {
    return this.id;
  }

  set Id(value: number) {
    this.id = value;
  }

  get Username(): string {
    return this.username;
  }

  set Username(value: string) {
    this.username = value;
  }

  static toModel(user: UserEntity) {
    const model = new UserModel();

    model.Id = user.id;
    model.Username = user.username;

    return model;
  }
}
