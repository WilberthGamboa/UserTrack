

import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

import { Profile, Strategy } from "passport-facebook";


@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy,'facebook') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
     configService:ConfigService
  ) {
    super({
      clientID: '716511889914139',
      clientSecret: 'b4f753bcad62d0da57e119acbd61353c',
      callbackURL: "http://localhost:3000/auth/facebook/redirect",
      scope:['email'],
      profileFields: ['id', 'displayName', 'emails']
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
  try {
    const {_json} = profile;
  const user = await this.userRepository.findOneBy({
    email:_json.email
  })
  if (user) return user; 

   const newUser =  this.userRepository.create({
    name:_json.name,
    user:_json.name,
    email:_json.email,
    password:'',
  })
  
  return {
    user: await  this.userRepository.save(newUser)
  }
  } catch (error) {
    console.log('xd')
    console.log(error.message)
  }
   
  }
}