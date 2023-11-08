import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards, BadRequestException, Req, Res,StreamableFile, Query, Put } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { UpdateAttendanceConfigurationDto } from './dto/update-attendance.dto';
import { ChooseAttendaceDto } from './dto/choose-attendance.dto';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { ResetPasswordDto } from '../auth/entities/resetpassword-auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

 
  @Post('')
  @SetMetadata('roles',['admin'])
  @UseGuards(AuthGuard(),UserRoleGuard)
  @ApiResponse({status:200,description:'Se setearon los times'})
  @ApiResponse({status:400,description:'Dato incorrecto'})
  setTimes(@Body() attendanceConfigurationDto:UpdateAttendanceConfigurationDto){
    this.attendanceService.setTimes(attendanceConfigurationDto)
  }
  @Post('pdf')
  @SetMetadata('roles',['admin'])
  @UseGuards(AuthGuard(),UserRoleGuard)
  async pdf(@Body() chooseDateDto:ChooseAttendaceDto,@Res() res: Response){
await this.attendanceService.pdf(chooseDateDto,res) 

  }
  @Get('excel')
  @SetMetadata('roles',['admin'])
  @UseGuards(AuthGuard())
  async excel(@Body() chooseDateDto:ChooseAttendaceDto,@Res() res: Response){
    console.log(chooseDateDto)
  
    
    const x = await this.attendanceService.excel(chooseDateDto)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=attendance.xlsx');

    // Escribir el archivo Excel en la respuesta HTTP
    await x.xlsx.write(res);

    // Finalizar la respuesta
    res.end();
     
  }
  @Get('allAttendance/:id?')
  @SetMetadata('roles',['admin'])
  @UseGuards(AuthGuard(),UserRoleGuard)
  async allAttendance(@Param('id') id:number){
    if (isNaN(Number(id))) {
      throw new BadRequestException('El id debe ser un numero');
    }
   return  await this.attendanceService.allAttendance(id)
  }

  @Get('myAttendance/:id?')
  @UseGuards(AuthGuard())
  async myAttendance(@Param('id') id:number,@Req() req){
    if (isNaN(Number(id))) {
      throw new BadRequestException('El id debe ser un numero');
    }
   return  await this.attendanceService.myAttendance(id,req)
  }
  

  @Get('setAttendance/:id')
  async setAttendance(@Param('id') id: string){
    console.log(id)
    await this.attendanceService.setAttendance(id);
  }

  

  
}
