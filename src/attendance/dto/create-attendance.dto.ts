import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateAttendanceConfigurationDto {
    @IsString()
    @IsNotEmpty()
    attendanceLimit:string;

    @IsString()
    @IsNotEmpty()
    delayLimit:string;



}
