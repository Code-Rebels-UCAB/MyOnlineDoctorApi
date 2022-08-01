import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PacienteAutenticacionDTO } from '../../dto/PacienteAutenticacionDTO';

export const ObtenerPaciente = createParamDecorator(
  (_data, ctx: ExecutionContext): PacienteAutenticacionDTO => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
