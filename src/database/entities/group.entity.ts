import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmployeeEntity } from "~/database/entities/employee.entity";
import { CabinetEntity } from "~/database/entities/cabinet.entity";

@Entity("groups")
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  group_name: string;

  @Column("text")
  group_desc: string;

  @OneToMany(() => EmployeeEntity, (employee) => employee.group)
  employees: EmployeeEntity[];

  @ManyToOne(() => CabinetEntity, (cabinet) => cabinet.groups)
  cabinet: CabinetEntity;
}
