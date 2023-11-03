import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards, BadRequestException, Req, Res } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { UpdateAttendanceConfigurationDto } from './dto/update-attendance.dto';
import { ChooseAttendaceDto } from './dto/choose-attendance.dto';
import { Response } from 'express';

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

  @Get('/allAttendance/:id?')
  @SetMetadata('roles',['admin'])
  @UseGuards(AuthGuard(),UserRoleGuard)
  async allAttendance(@Param('id') id:number){
    if (isNaN(Number(id))) {
      throw new BadRequestException('El id debe ser un numero');
    }
   return  await this.attendanceService.allAttendance(id)
  }

  @Get('/myAttendance/:id?')
  @UseGuards(AuthGuard())
  async myAttendance(@Param('id') id:number,@Req() req){
    if (isNaN(Number(id))) {
      throw new BadRequestException('El id debe ser un numero');
    }
   return  await this.attendanceService.myAttendance(id,req)
  }
  
  @Get('/pdf')
  @SetMetadata('roles',['admin'])
  @UseGuards(AuthGuard(),UserRoleGuard)
  async pdf(@Body() chooseDateDto:ChooseAttendaceDto){
    
   return  
  }
  @Post('/excel')
  @SetMetadata('roles',['admin'])
  @UseGuards(AuthGuard())
  async excel(@Body() chooseDateDto:any,@Res() res: Response){
    console.log(chooseDateDto)
    res.setHeader('Content-Disposition', 'attachment; filename=mi-archivo.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const x = await this.attendanceService.excel(chooseDateDto)
    res.send(x)
     
  }

  
}
