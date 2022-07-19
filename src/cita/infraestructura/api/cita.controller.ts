import { Body, Controller, Get, Inject, Param, Put, Query, Post} from '@nestjs/common';
import { AgendarCita } from '../../aplicacion/servicios/AgendarCita.service';
import { BuscarCitasPaciente } from '../../aplicacion/servicios/BuscarCitasPaciente.service';
import { CitasDoctor } from '../../aplicacion/servicios/CitasDoctor.service';
import { CitasSolicitadasDoctor } from '../../aplicacion/servicios/CitasSolicitadasDoctor.service';
import { CantidadPacientesDoctor } from '../../aplicacion/servicios/CantidadPacientesDoctor.service';
import { CantidadCitasDiaDoctor } from '../../aplicacion/servicios/CantidadCitasDiaDoctor.service';
import { AgendarCitaDTO } from '../../aplicacion/dto/AgendarCitaDTO';
import { SolicitarCita } from '../../aplicacion/servicios/SolicitarCita.service';
import { SolicitarCitaDTO } from '../../aplicacion/dto/SolicitarCitaDTO';
import { AceptarCita } from '../../aplicacion/servicios/AceptarCita.service';
import { CancelarCita } from '../../aplicacion/servicios/CancelarCita.service';
import { IniciarCita } from '../../aplicacion/servicios/IniciarCita.service';
import { BloquearCita } from '../../aplicacion/servicios/BloquearCita.service';
import { SuspenderCita } from '../../aplicacion/servicios/SuspenderCita.service';

@Controller('api/cita')
export class CitaController {
  constructor(
    @Inject(CitasSolicitadasDoctor)
    private readonly citasSolicitadasDoctor: CitasSolicitadasDoctor,
    @Inject(CitasDoctor)
    private readonly citasDoctor: CitasDoctor,
    @Inject(AgendarCita)
    private readonly agendarCita: AgendarCita,
    @Inject(BuscarCitasPaciente)
    private readonly buscarCitasPaciente: BuscarCitasPaciente,
    @Inject(CantidadPacientesDoctor)
    private readonly cantidadPacientesDoctor: CantidadPacientesDoctor,
    @Inject(CantidadCitasDiaDoctor)
    private readonly cantidadCitasDia: CantidadCitasDiaDoctor,
    @Inject(IniciarCita)
    private readonly iniciarCita: IniciarCita,
    @Inject(SolicitarCita)
    private readonly solicitarCita: SolicitarCita,
    @Inject(AceptarCita)
    private readonly aceptarCita: AceptarCita,
    @Inject(CancelarCita)
    private readonly cancelarCita: CancelarCita,
    @Inject(BloquearCita)
    private readonly bloquearCita: BloquearCita,
    @Inject(SuspenderCita)
    private readonly suspenderCita: SuspenderCita
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

  @Put('iniciarcita/:citaid')
  async inciarCita(@Param('citaid') citaid: string) {
    const cita = await this.iniciarCita.ejecutar(citaid);
    return cita;
  }
  @Post('solicitarcita')
  async solicitarCitaPost(@Body() datos: SolicitarCitaDTO){
    let citasolicitada = await this.solicitarCita.ejecutar(datos);
    return citasolicitada;
  }

  @Put('aceptarcita')
  async aceptarCitaPut(@Query('citaId') citaId: string){
    let citaAceptada = await this.aceptarCita.ejecutar(citaId);
    return citaAceptada;
  }

  @Put('cancelarcita')
  async cancelarCitaPut(@Query('citaId') citaId: string){
    const CitaCancelada = await this.cancelarCita.ejecutar(citaId);
    return CitaCancelada;
  }

  @Put('bloquearcita')
  async bloquearCitaPut(@Query('citaId') citaId: string){
    const CitaBloquear = await this.bloquearCita.ejecutar(citaId);
    return CitaBloquear;
  }

  @Put('suspendercita')
  async suspenderCitaPut(@Query('citaId') citaId: string){
    const CitaSuspender = await this.suspenderCita.ejecutar(citaId);
    return CitaSuspender;
  }

}
