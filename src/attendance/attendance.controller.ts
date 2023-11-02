import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';

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
  setTimes(){
    return{
      hola:'hola mamaguevoxd'
    }
  }
  
}
