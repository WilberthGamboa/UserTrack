import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { AttendanceService } from 'src/attendance/attendance.service';
import { Attendance } from 'src/attendance/entities/attendance.entity';

import { Repository } from 'typeorm';
import * as qrcode from 'qrcode';

@Injectable()
export class QrService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>, 
        private readonly attendanceService: AttendanceService
    ){}
 async getQr(req:any):Promise<string>{
    const id = req.user.id;
    await this.attendanceService.create(id);
    const qr = await qrcode.toDataURL('http://localhost:3000/attendance/'+id)
    return qr;
    
 }
 async validateQr(){

 }
}
