import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "~/database/entities/group.entity";

@Entity("employees")
export class EmployeeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    fio: string;

    @Column("text")
    email: string;

    @Column("text")
    phone: string

    @Column('text')
    birth_date: string

    @ManyToOne(() => GroupEntity, group => group.employees)
    group: GroupEntity
}