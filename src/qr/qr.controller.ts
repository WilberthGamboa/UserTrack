import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { QrService } from './qr.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { Request } from 'express';


@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getQr(@Req() req:Request){
    const qr = await this.qrService.getQr(req)
   return {qr}
  }
  
  
}
