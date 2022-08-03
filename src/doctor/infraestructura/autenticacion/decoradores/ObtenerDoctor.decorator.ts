import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DoctorAutenticacionDTO } from '../dtos/DoctorAutenticacionDTO';

export const ObtenerDoctor = createParamDecorator(
  (_data, ctx: ExecutionContext): DoctorAutenticacionDTO => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);