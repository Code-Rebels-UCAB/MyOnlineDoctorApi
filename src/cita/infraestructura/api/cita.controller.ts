import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { CitasSolicitadasDoctor } from 'src/cita/aplicacion/servicios/CitasSolicitadasDoctor';
import { CantidadPacientesDoctor } from 'src/cita/aplicacion/servicios/CantidadPacientesDoctor';

@Controller('api/cita')
export class CitaController {
  constructor(
    @Inject(CitasSolicitadasDoctor)
    private readonly citasSolicitadasDoctor: CitasSolicitadasDoctor,
    private readonly cantidadPacientesDoctor: CantidadPacientesDoctor,
  ) {}

  @Get('solicitadas/:doctorid')
  async getSolicitadas(@Param('doctorid') doctorid: string) {
    const citas = await this.citasSolicitadasDoctor.ejecutar(doctorid);
    return citas;
  }

  @Get('pacientes/doctor')
  async getPacientesDoctor(@Query('doctorId') doctorId: string) {
    const pacientes = await this.cantidadPacientesDoctor.ejecutar(doctorId);
    return pacientes;
  }
}
