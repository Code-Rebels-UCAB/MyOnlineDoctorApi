import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PacienteAutenticacionDTO } from '../../dto/PacienteAutenticacionDTO';
import { PacienteORM } from '../../persistencia/Paciente.orm';

export const ObtenerPaciente = createParamDecorator(
  (_data, ctx: ExecutionContext): PacienteAutenticacionDTO => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
