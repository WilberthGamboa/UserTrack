import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { id } from "date-fns/locale";

export class AddCommentDto{
    @ApiProperty(
        {
            description:'Id del attendance'
        }
    )
    @IsUUID()
    @IsNotEmpty()
    idAttendance:string;
    @ApiProperty(
        {
            description:'Comentario a agregar attendance'
        }
    )
    @IsString()
    @IsNotEmpty()
    comment:string;
}