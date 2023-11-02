import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attendance {

//Hay que traer la información del usuario
@PrimaryGeneratedColumn('uuid')
id: string;

    @ManyToOne(() => User,(user) =>user.attendance, {cascade:true})
    @JoinColumn()
    user:User;
    
    @Column({type:'date'})
    date:Date

    @Column({type:'time',nullable:true})
    arrivalTime:Date

    @Column()
    asistanceType:string
  
    @Column({type:'time' ,nullable:true})
    endTime:Date
    /*
    @Column()
    comments:string[]
*/
}
