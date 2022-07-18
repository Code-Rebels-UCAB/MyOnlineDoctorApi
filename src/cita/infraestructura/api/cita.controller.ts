import { Body, Controller, Get, Inject, Param, Put, Query} from '@nestjs/common';
import { AgendarCita } from '../../aplicacion/servicios/AgendarCita.service';
import { BuscarCitasPaciente } from '../../aplicacion/servicios/BuscarCitasPaciente.service';
import { CitasDoctor } from '../../aplicacion/servicios/CitasDoctor.service';
import { CitasSolicitadasDoctor } from '../../aplicacion/servicios/CitasSolicitadasDoctor.service';
import { CantidadPacientesDoctor } from '../../aplicacion/servicios/CantidadPacientesDoctor.service';
import { CantidadCitasDiaDoctor } from '../../aplicacion/servicios/CantidadCitasDiaDoctor.service';
import { AgendarCitaDTO } from '../../aplicacion/dto/AgendarCitaDTO';

@Controller('api/cita')
export class CitaController {
  constructor(
    @Inject(CitasSolicitadasDoctor)
    private readonly citasSolicitadasDoctor: CitasSolicitadasDoctor,
    private readonly citasDoctor: CitasDoctor,
    private readonly agendarCita: AgendarCita,
    private readonly buscarCitasPaciente: BuscarCitasPaciente,
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

  @Put('putagendarcita/:citaid')
  async postAgendar(@Body() datos: AgendarCitaDTO, @Param('citaid') citaid: string) {
    datos.idCita = citaid;
    const citas = await this.agendarCita.ejecutar(datos);
    return citas
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
