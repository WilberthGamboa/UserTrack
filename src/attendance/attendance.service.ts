import { BadRequestException, Injectable } from '@nestjs/common';

import { Between, Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import * as qrcode from 'qrcode';
import { compareAsc, format, isAfter, parse } from 'date-fns';
import { AttendanceConfiguration } from './entities/attendaceConfiguration.entity';
import { UpdateAttendanceConfigurationDto } from './dto/update-attendance.dto';
@Injectable()
export class AttendanceService {

  constructor(
    @InjectRepository(Attendance)
    private readonly repositoryAttendance: Repository<Attendance>,
    @InjectRepository(User)
    private readonly repositoryUser: Repository<User>,
    @InjectRepository(AttendanceConfiguration)
    private readonly repositoryAttendanceConfiguration: Repository<AttendanceConfiguration>

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
        user: {id:user.id},
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
        user: {id:usuario.id},
        date: new Date()
      }
    })
    // Si es falta
    if (attendanceUserToday.asistanceType == 'FALTA' && attendanceUserToday.arrivalTime===null) {
      // Crear un objeto Date con la hora, los minutos y los segundos deseados
      const myTime = new Date();
      const formattedTime = format(myTime, 'HH:mm:ss');
      const tiempos = await this.repositoryAttendanceConfiguration.find()
      let tipoAttendance = 'PRESENTE'
  
      const time1Date = parse(tiempos[0].attendanceLimit, 'HH:mm:ss', new Date());
      const time2Date = parse(tiempos[0].delayLimit, 'HH:mm:ss', new Date());

      if (isAfter(myTime,time1Date)) {
        tipoAttendance = 'RETARDO'
      }

      if (isAfter(myTime,time2Date)) {
        tipoAttendance= 'FALTA'
      }

      await this.repositoryAttendance.update(attendanceUserToday.id, {
        asistanceType: tipoAttendance,
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
  async setTimes(updateAttendanceConfigurationDto:UpdateAttendanceConfigurationDto){

    const data =  await this.repositoryAttendanceConfiguration.find()
    
    await this.repositoryAttendanceConfiguration.update({id:data[0].id},{
      attendanceLimit:updateAttendanceConfigurationDto.attendanceLimit,
      delayLimit:updateAttendanceConfigurationDto.delayLimit
    })

  }

}
