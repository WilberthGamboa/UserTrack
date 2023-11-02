import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Between, Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import * as qrcode from 'qrcode';
import { format } from 'date-fns';
@Injectable()
export class AttendanceService {

  constructor(
    @InjectRepository(Attendance)
    private readonly repositoryAttendance: Repository<Attendance>,
    @InjectRepository(User)
    private readonly repositoryUser: Repository<User>

  ) {

  }
  async create(userId: string) {
    const today = new Date()
    //Buscamos el usuario 
    const user = await this.repositoryUser.findOneBy({
      id: userId
    })

    // Buscamos el usuario correspondiente con la fecha de hoy
    const existAttendance = await this.repositoryAttendance.findOne({
      where: {
        user: user,
        date: today,
      }
    })
    // Si no existe su asistencia (el registro) crea uno con falta
    if (!existAttendance) {
      const nuevo = this.repositoryAttendance.create({
        user: user,
        date: today,
        arrivalTime: null,
        asistanceType: 'FALTA',
        endTime: null
      })
      await this.repositoryAttendance.save(nuevo)

    }


  }

  async setAttendance(id: string) {
    // Validamos que el usuario exista
    const usuario = await this.repositoryUser.findOneBy({
      id: id
    })
    if (!usuario) {
      throw new BadRequestException('El usuario no existe');
    }
    // Retornamos la attendance relacionada al día de hoy y al usuario
    const attendanceUserToday = await this.repositoryAttendance.findOne({
      where: {
        user: usuario,
        date: new Date()
      }
    })
    // Si es falta
    if (attendanceUserToday.asistanceType == 'FALTA') {
      // Crear un objeto Date con la hora, los minutos y los segundos deseados
      const myTime = new Date();

      // Formatear la hora en una cadena de tiempo
      const formattedTime = format(myTime, 'HH:mm:ss');
      attendanceUserToday.asistanceType = 'ASISTENCIA'
      await this.repositoryAttendance.update(attendanceUserToday.id, {
        asistanceType: 'PRESENTE',
        arrivalTime: formattedTime
      })
      return;
    }
    // Si es distinto de falta y el endtime es distinto de null
    if (attendanceUserToday.asistanceType != 'FALTA' && attendanceUserToday.endTime == null) {
      const myTime = new Date();
      const formattedTime = format(myTime, 'HH:mm:ss');

      await this.repositoryAttendance.update(attendanceUserToday.id, {
        endTime: formattedTime
      })
    }
  }


}
