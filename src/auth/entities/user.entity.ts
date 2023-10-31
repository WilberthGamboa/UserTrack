import { Attendance } from "src/attendance/entities/attendance.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    user: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Attendance, (attendance) => attendance.user)
    attendance: Attendance[];
}
