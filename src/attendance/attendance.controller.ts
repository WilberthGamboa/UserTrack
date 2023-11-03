import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { UpdateAttendanceConfigurationDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get(':id')
  async setAttendance(@Param('id') id: string){
    console.log(id)
    await this.attendanceService.setAttendance(id);
  }

  @Post('/')
  @SetMetadata('roles',['admin'])
  @UseGuards(AuthGuard(),UserRoleGuard)
  setTimes(@Body() attendanceConfigurationDto:UpdateAttendanceConfigurationDto){
    this.attendanceService.setTimes(attendanceConfigurationDto)
  }

  

  
}
