import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { AttendanceConfiguration } from 'src/attendance/entities/attendaceConfiguration.entity';


@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(AttendanceConfiguration)
    private readonly attendanceConfigurationRepository: Repository<AttendanceConfiguration>,
  ) {}

  async runSeed() {
    // Crear usuarios normales
    const user1 = this.userRepository.create({
      name: 'UsuarioNormal1',
      user: 'user1',
      email: 'usuario1@example.com',
      password: 'contraseña',
      roles: ['user'],
    });
    await this.userRepository.save(user1);

    const user2 = this.userRepository.create({
      name: 'UsuarioNormal2',
      user: 'user2',
      email: 'usuario2@example.com',
      password: 'contraseña',
      roles: ['user'],
    });
    await this.userRepository.save(user2);

    const user3 = this.userRepository.create({
      name: 'UsuarioNormal3',
      user: 'user3',
      email: 'usuario3@example.com',
      password: 'contraseña',
      roles: ['user'],
    });
    await this.userRepository.save(user3);

    // Crear usuarios admin
    const admin1 = this.userRepository.create({
      name: 'Admin1',
      user: 'admin1',
      email: 'admin1@example.com',
      password: 'contraseña',
      roles: ['admin'],
    });
    await this.userRepository.save(admin1);

    const admin2 = this.userRepository.create({
      name: 'Admin2',
      user: 'admin2',
      email: 'admin2@example.com',
      password: 'contraseña',
      roles: ['admin'],
    });
    await this.userRepository.save(admin2);

    // Crear configuración de asistencia
    const attendanceConfig = this.attendanceConfigurationRepository.create({
      attendanceLimit: '06:22:16',
      delayLimit: '10:22:16',
    });
    await this.attendanceConfigurationRepository.save(attendanceConfig);

    // Crear asistencias
    const attendance1 = this.attendanceRepository.create({
      user: user1,
      date: new Date(),
      arrivalTime: new Date(),
      asistanceType: 'Entrada',
      endTime: new Date(),
      comments: 'Comentario de prueba 1',
    });
    await this.attendanceRepository.save(attendance1);

    const attendance2 = this.attendanceRepository.create({
      user: user2,
      date: new Date(),
      arrivalTime: new Date(),
      asistanceType: 'Entrada',
      endTime: new Date(),
      comments: 'Comentario de prueba 2',
    });
    await this.attendanceRepository.save(attendance2);

    return 'SEED EXECUTED';
  }
}
