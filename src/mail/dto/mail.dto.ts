import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class MailDto{
    @ApiProperty(
        {
            description:'persona a enviarle el email'
        }
    )
    @IsEmail()
    email:string;
}