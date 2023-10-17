import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService : JwtService
  ){

  }

  async create(createUserDto: CreateAuthDto) {
    
   try {

    const user = this.userRepository.create(createUserDto)

    await this.userRepository.save(user);
  

    return {
      ...user,
      token:this.getJwtToken({id:user.id})
    };
    // retornar jwt
   } catch (error) {
    console.log(error)
    
    
   }
  }

  async login (loginUserDto:LoginUserDto){
    const {password,email} = loginUserDto;
    const user = await this.userRepository.findOne({
      where:{email},
      select:{email:true,password:true,id:true}
    })
    if (!user) {
      throw new UnauthorizedException('Credential are not valid (email)')
    }
    
    return {
      ...user,
      token:this.getJwtToken({id:user.id})
    };
   }

  private getJwtToken(payload:JwtPayload){

    // 
    const token = this.jwtService.sign(payload);
    return token;
    
  }
}
