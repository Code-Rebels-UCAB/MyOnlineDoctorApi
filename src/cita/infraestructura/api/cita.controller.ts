import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { BuscarCitasPaciente } from '../../aplicacion/servicios/BuscarCitasPaciente';
import { CitasDoctor } from '../../aplicacion/servicios/CitasDoctor';
import { CitasSolicitadasDoctor } from '../../aplicacion/servicios/CitasSolicitadasDoctor';
import { CantidadPacientesDoctor } from 'src/cita/aplicacion/servicios/CantidadPacientesDoctor';
import { CantidadCitasDiaDoctor } from 'src/cita/aplicacion/servicios/CantidadCitasDiaDoctor';

@Controller('api/cita')
export class CitaController {
  constructor(
    @Inject(CitasSolicitadasDoctor)
    private readonly citasSolicitadasDoctor: CitasSolicitadasDoctor,
    private readonly citasDoctor: CitasDoctor,
    private readonly buscarCitasPaciente: BuscarCitasPaciente
    private readonly cantidadPacientesDoctor: CantidadPacientesDoctor,
    private readonly cantidadCitasDia: CantidadCitasDiaDoctor,
  ) {}

  @Get('getsolicitudesdoctor/:doctorid')
  async getSolicitadasDoctor(@Param('doctorid') doctorid: string) {
    const citas = await this.citasSolicitadasDoctor.ejecutar(doctorid);
    return citas;
  }

  @Get('getcitasdoctor/:doctorid')
  async getTodasDoctor(@Param('doctorid') doctorid: string) {
    const citas = await this.citasDoctor.ejecutar(doctorid);
    return citas;
  }

  @Get('getcitaspaciente/:pacienteid')
  async getCitasPaciente(@Param('pacienteid') pacienteid: string) {
    const citas = await this.buscarCitasPaciente.ejecutar(pacienteid);
    return citas;
  }

@Get('cantidadPacientes/doctor')
  async getPacientesDoctor(@Query('doctorId') doctorId: string) {
    const pacientes = await this.cantidadPacientesDoctor.ejecutar(doctorId);
    return pacientes;
  }

  @Get('dia/doctor')
  async geCitasDelDiaDoctor(@Query('doctorId') doctorId: string) {
    const citas = await this.cantidadCitasDia.ejecutar(doctorId);
    return citas;
  }

}
