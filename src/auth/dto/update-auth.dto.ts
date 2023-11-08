import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
export class LoginUserDto{
    @ApiProperty(
        {
            description:'Email del usuario a loguear'
        }
    )
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty(
        {
            description:'password del usuario a loguear'
        }
    )
    @IsString()
    @IsNotEmpty()
    password: string;
}