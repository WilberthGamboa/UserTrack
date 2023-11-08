import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){
        this.transporter = nodemailer.createTransport(
            {
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: 'wgdonde@gmail.com',
                pass: 'rwgp jevr jkwr lohf',
              },
            }
          );
    }
    
    async sendEmail(email:string){
        const user = await this.userRepository.findOne({
            where:{
                email:email
            }
        })
        if(!user) throw new  BadRequestException('El correo no está registrado')
        await this.transporter.sendMail({
            to:`${email}`,
            subject:'Recuperacion password',
            html:`
            <!DOCTYPE html>
<html>
  <head>
    <title>Restablecimiento de contraseña</title>
  </head>
  <body>
    <h1>Restablecimiento de contraseña</h1>
    <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no has realizado esta solicitud, puedes ignorar este mensaje.</p>
    <p>Para restablecer tu contraseña, haz clic en el siguiente enlace o cópialo y pégalo en tu navegador:</p>
    <a href="http://localhost:4200/resetpassword?jwt=${user.id}">Restablecer contraseña</a>
    <p>Este enlace es válido por una hora. Después de ese tiempo, deberás solicitar un nuevo enlace de restablecimiento de contraseña si aún necesitas cambiar tu contraseña.</p>
    
  </body>
</html>
            
            `
           
          
        })
    }
    

}
