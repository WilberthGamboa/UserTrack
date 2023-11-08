import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateAttendanceConfigurationDto {
    @ApiProperty(
        {
            description:'Fecha limite para entrar sin retardo'
        }
    )
    @IsString()
    @IsNotEmpty()
    attendanceLimit:string;
    @ApiProperty(
        {
            description:'Fecha limite para entrar sin falta'
        }
    )
    @IsString()
    @IsNotEmpty()
    delayLimit:string;



}
