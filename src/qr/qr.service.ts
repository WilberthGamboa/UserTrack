import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { AttendanceService } from 'src/attendance/attendance.service';
import { Attendance } from 'src/attendance/entities/attendance.entity';

import { Repository } from 'typeorm';


@Injectable()
export class QrService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>, 
        private readonly attendanceService: AttendanceService
    ){}
 getQr(req:any){
    console.log(req.user)
    const id = req.user.id;
    this.attendanceService.create(id)
    const today = new Date().toISOString();
    
 }
}
