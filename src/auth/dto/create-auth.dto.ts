import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateAuthDto {
    @ApiProperty(
        {
            description:'Nombre del usuario'
        }
    )
    @IsNotEmpty()
    name:string;

    @ApiProperty(
        {
            description:'usuario'
        }
    )
    @IsNotEmpty()
    user:string;
    
    @ApiProperty(
        {
            description:'El email del usuario'
        }
    )
    @IsEmail()
    email:string;

    @ApiProperty(
        {
            description:'password del usuario'
        }
    )
    @IsStrongPassword()
    password:string;
    
}
