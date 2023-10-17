import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    user:string;
    @IsEmail()
    email:string;
    @IsNotEmpty()
    password:string;
    
}
