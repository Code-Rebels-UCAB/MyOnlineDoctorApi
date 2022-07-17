import { Controller, Get, Inject, Param } from '@nestjs/common';
import { CitasSolicitadasDoctor } from 'src/cita/aplicacion/servicios/CitasSolicitadasDoctor';

@Controller('api/cita')
export class CitaController {
  constructor(
    @Inject(CitasSolicitadasDoctor)
    private readonly citasSolicitadasDoctor: CitasSolicitadasDoctor,
  ) {}

  @Get('solicitadas/:doctorid')
  async getSolicitadas(@Param('doctorid') doctorid: string) {
    const citas = await this.citasSolicitadasDoctor.ejecutar(doctorid);
    return citas;
  }

  @Get('pacientes/:doctorId')
  async getPacientesDoctor(@Param('doctorId') doctorId: string) {
    const pacientes = await this.citasSolicitadasDoctor.ejecutar(doctorId);
    return pacientes;
  }
}
