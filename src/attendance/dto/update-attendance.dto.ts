import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceConfigurationDto } from './create-attendance.dto';

export class UpdateAttendanceConfigurationDto extends PartialType(CreateAttendanceConfigurationDto) {}
