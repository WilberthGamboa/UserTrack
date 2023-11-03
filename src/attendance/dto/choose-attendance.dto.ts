import { IsDate, IsDateString } from "class-validator";

export class ChooseAttendaceDto{
    @IsDateString()
    chooseDate:Date;
}