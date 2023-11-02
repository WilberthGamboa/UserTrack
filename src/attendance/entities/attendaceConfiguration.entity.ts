


import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AttendanceConfiguration {


@PrimaryGeneratedColumn('uuid')
id: string;

    @Column({type:'time',nullable:false,default:'06:22:16'})
    attendanceLimit:string

    @Column({type:'time' ,nullable:false,default:'10:22:16'})
    delayLimit:string
  
}
