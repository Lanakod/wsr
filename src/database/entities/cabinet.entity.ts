import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "~/database/entities/group.entity";

@Entity("cabinets")
export class CabinetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("int")
  number: number;

  @OneToMany(() => GroupEntity, (group) => group.cabinet)
  groups: GroupEntity[];
}
