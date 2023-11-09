import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { id } from "date-fns/locale";

export class AddCommentDto{

    @IsUUID()
    @IsNotEmpty()
    idAttendance:string;

    @IsString()
    @IsNotEmpty()
    comment:string;
}