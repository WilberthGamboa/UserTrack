import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Between, Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import * as qrcode from 'qrcode';
import { compareAsc, format, isAfter, parse } from 'date-fns';
import { AttendanceConfiguration } from './entities/attendaceConfiguration.entity';
import { UpdateAttendanceConfigurationDto } from './dto/update-attendance.dto';
import { ChooseAttendaceDto } from './dto/choose-attendance.dto';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as ExcelJS from 'exceljs';
import { ResetPasswordDto } from '../auth/entities/resetpassword-auth.dto';

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

 async allAttendance(id:number){

    const attendanceList = await this.repositoryAttendance.find({
      skip:(id-1)*10,
      take:10,
      
    })
    
    return attendanceList;
  }

 async myAttendance (id:number,req:any){
  console.log(req.user)
  const attendanceList = await this.repositoryAttendance.find({
    skip:(id-1)*10,
    take:10,
    where:{
      user:{
        id:req.user.id
      }
    }
    
  })
  
  return attendanceList;

 }

 async excel(chooseDateDto:ChooseAttendaceDto){
  const data = await this.repositoryAttendance.find({
    where:{
      date:chooseDateDto.chooseDate
    },
    relations:['user']
  })
  const test = [];
 for (const iterator of data) {
  test.push({
    userName:iterator.user.name,
    date:iterator.date,
    arrivalTime:iterator.arrivalTime,
    asistanceType:iterator.asistanceType,
    endTime:iterator.endTime
  })
 }
 
  const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Hoja1');

// Agrega datos a la hoja
worksheet.columns = [
  { header: 'userName', key: 'id' },
  { header: 'date', key: 'date' },
  { header: 'arrivalTime', key: 'arrivalTime' },
  { header: 'asistanceType', key: 'asistanceType' },
  { header: 'endTime', key: 'endTime' },
];


worksheet.addRows(test);

// Guarda el archivo Excel en el sistema de archivos
/*
await workbook.xlsx.writeFile('ejemplo.xlsx')
  .then(function () {
    console.log('Archivo Excel creado con éxito');
  })
  .catch(function (error) {
    console.error('Error al crear el archivo Excel:', error);
  });
  */
  //const buffer = await workbook.xlsx.writeBuffer();
return workbook;
 }

 async pdf(chooseAttendaceDto:ChooseAttendaceDto,res:Response){
  const data = await this.repositoryAttendance.find({
    where:{
      date:chooseAttendaceDto.chooseDate
    },
    relations:['user']
  })
  // Crear un nuevo documento PDF
const doc = new PDFDocument();
const buffers = [];

// Crear un archivo PDF para escribir
const stream = fs.createWriteStream('objeto.pdf');

// Pipe el documento PDF a la corriente de escritura
doc.pipe(stream);

// Definir las propiedades del PDF
doc.fontSize(12);

// Recorrer las propiedades del objeto y agregarlas al PDF

doc.text('xddxdx')
for (const key in data) {
  if (data.hasOwnProperty(key)) {
    doc.text(`${key}: ${data[key].user.name} \n
    ${key}: ${data[key].date}  \n
    ${key}: ${data[key].asistanceType} \n
    ${key}: ${data[key].arrivalTime}    \n
    ${key}: ${data[key].endTime}     \n
    `);
  }
}
doc.on('data', (chunk) => {
  buffers.push(chunk);
});
// Finalizar el documento PDF
doc.on('end', () => {
  const pdfBuffer = Buffer.concat(buffers);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="objeto.pdf"');
  res.send(pdfBuffer);
});

doc.end()
 }

 
}
