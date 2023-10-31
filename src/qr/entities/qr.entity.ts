import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Qr {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
}
