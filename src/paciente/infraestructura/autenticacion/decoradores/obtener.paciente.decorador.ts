import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PacienteORM } from '../../persistencia/Paciente.orm';
export const ObtenerPaciente = createParamDecorator(
  (_data, ctx: ExecutionContext): PacienteORM => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req)
    return req.user;
  },
);
