import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Between, Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import * as qrcode from 'qrcode';
@Injectable()
export class AttendanceService {

  constructor(
    @InjectRepository(Attendance)
    private readonly repositoryAttendance: Repository<Attendance>,
    @InjectRepository(User)
    private readonly repositoryUser: Repository<User>

  ){

  }
  async create(userId:string) {
    const today = new Date()
    const user = await this.repositoryUser.findOneBy({
      id:userId
    })
    const now = new Date()
   
    const existAttendance = await this.repositoryAttendance.findOne({
     where:{
      user:user,
      date: now,
     }
    })
    console.log(existAttendance)
    if (!existAttendance) {
      const nuevo = this.repositoryAttendance.create({
        user:user,
        date:today,
        arrivalTime:null,
        asistanceType:'FALTA',
        endTime:null
      })
      await this.repositoryAttendance.save(nuevo)
      return user.id;
    }
    /*
const textToEncode = 'Hola, este es un código QR generado con Node.js';

qrcode.toDataURL(textToEncode, (err, url) => {
  if (err) throw err;

  console.log(url); // Esto imprimirá la URL del código QR en la consola
});
*/
    /*
    this.repositoryAttendance.create({
      
    })*/
    return 'This action adds a new attendance';
  }

  findAll() {
    return `This action returns all attendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
