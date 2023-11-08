import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString } from "class-validator";

export class ChooseAttendaceDto{
    @ApiProperty(
        {
            description:'Fecha a enviar para generar el reporte de dicho día'
        }
    )
    @IsDateString()
    chooseDate:Date;
}