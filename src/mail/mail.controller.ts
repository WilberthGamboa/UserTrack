import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { Request } from 'express';
import { MailDto } from './dto/mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('')

  async sendEmail(@Body() mailDto: MailDto){
    
    await this.mailService.sendEmail(mailDto.email)
  }  

}
