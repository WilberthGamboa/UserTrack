import { IsStrongPassword, IsUUID } from "class-validator";

export class ResetPasswordDto{
    @IsUUID()
    id:string;
    @IsStrongPassword()
    newpassword:string;
}