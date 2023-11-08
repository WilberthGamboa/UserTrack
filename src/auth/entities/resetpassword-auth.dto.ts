import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword, IsUUID } from "class-validator";

export class ResetPasswordDto{
    @IsUUID()
    @ApiProperty(
        {
            description:'jwt del usuario (generado en el correo)'
        }
    )
    id:string;
    @IsStrongPassword()
    @ApiProperty(
        {
            description:'Nueva contraseña a ingresar'
        }
    )
    newpassword:string;
}