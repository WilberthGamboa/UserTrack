import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attendance {

//Hay que traer la información del usuario
@PrimaryGeneratedColumn('uuid')
id: string;

    @OneToOne(() => User, {cascade:true})
    @JoinColumn()
    user:User;
    
    @Column()
    date:Date

    @Column()
    arrivalTime:Date

    @Column()
    asistanceType:string

    @Column()
    endTime:Date
    /*
    @Column()
    comments:string[]
*/
}
