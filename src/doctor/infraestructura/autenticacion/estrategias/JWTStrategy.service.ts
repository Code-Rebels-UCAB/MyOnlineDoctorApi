import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWTDoctorStrategy extends PassportStrategy(
  Strategy,
  'jwt-doctor',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
      ignoreExpiration: true,
    });
  }

  async validate(payload: any) {
    return { id_doctor: payload.id_doctor, status: payload.status };
  }
}
