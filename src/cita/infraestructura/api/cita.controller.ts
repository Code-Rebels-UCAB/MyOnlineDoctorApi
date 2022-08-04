import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Query,
  Post,
  UseGuards,
} from '@nestjs/common';
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
import { FinalizarCita } from '../../aplicacion/servicios/FinalizarCita.service';
import { CitasDiaDoctor } from '../../aplicacion/servicios/CitasDiaDoctor.service';
import { JWTDoctorGuard } from '../../../doctor/infraestructura/autenticacion/guards/JWTDoctor.guard';
import { ObtenerDoctor } from '../../../doctor/infraestructura/autenticacion/decoradores/ObtenerDoctor.decorator';
import { DoctorAutenticacionDTO } from '../../../doctor/infraestructura/autenticacion/dtos/DoctorAutenticacionDTO';

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
    private readonly suspenderCita: SuspenderCita,
    @Inject(FinalizarCita)
    private readonly finalizarCita: FinalizarCita,
    @Inject(CitasDiaDoctor)
    private readonly citasalDia: CitasDiaDoctor,
  ) {}

  @UseGuards(JWTDoctorGuard)
  @Get('getsolicitudesdoctor')
  async getSolicitadasDoctor(@ObtenerDoctor() doctor: DoctorAutenticacionDTO) {
    const citas = await this.citasSolicitadasDoctor.ejecutar(doctor.id_doctor);
    return citas;
  }

  @UseGuards(JWTDoctorGuard)
  @Get('getcitasdoctor')
  async getTodasDoctor(@ObtenerDoctor() doctor: DoctorAutenticacionDTO) {
    const citas = await this.citasDoctor.ejecutar(doctor.id_doctor);
    return citas;
  }

  @Get('getcitaspaciente/:pacienteid')
  async getCitasPaciente(@Param('pacienteid') pacienteid: string) {
    const citas = await this.buscarCitasPaciente.ejecutar(pacienteid);
    return citas;
  }

  @UseGuards(JWTDoctorGuard)
  @Put('putagendarcita/:citaid')
  async postAgendar(
    @Body() datos: AgendarCitaDTO,
    @Param('citaid') citaid: string,
  ) {
    datos.idCita = citaid;
    const citas = await this.agendarCita.ejecutar(datos);
    return citas;
  }

  //@UseGuards(JWTDoctorGuard)
  @Get('cantidadPacientes/doctor')
  async getPacientesDoctor(@Query('doctorId') doctorId: string) {
    const pacientes = await this.cantidadPacientesDoctor.ejecutar(doctorId);
    return pacientes;
  }

  //END-POINT PARA OBTENER TODAS LAS CITAS AL DIA DEL DOCTOR
  @UseGuards(JWTDoctorGuard)
  @Get('citasAlDiadoctor')
  async getCitasDelDiaDoctor(@ObtenerDoctor() doctor: DoctorAutenticacionDTO) {
    const citas = await this.citasalDia.ejecutar(doctor.id_doctor);
    return citas;
  }

  //@UseGuards(JWTDoctorGuard)
  @Get('dia/doctor')
  async getCantCitasDelDiaDoctor(@Query('doctorId') doctorId: string) {
    const Cantcitas = await this.cantidadCitasDia.ejecutar(doctorId);
    return Cantcitas;
  }

  @UseGuards(JWTDoctorGuard)
  @Put('iniciarcita')
  async iniciarCitaPut(@Query('citaid') citaid: string) {
    const cita = await this.iniciarCita.ejecutar(citaid);
    return cita;
  }

  //@UseGuards(JWTDoctorGuard)
  @Post('solicitarcita')
  async solicitarCitaPost(@Body() datos: SolicitarCitaDTO) {
    let citasolicitada = await this.solicitarCita.ejecutar(datos);
    return citasolicitada;
  }

  //@UseGuards(JWTDoctorGuard)
  @Put('aceptarcita')
  async aceptarCitaPut(@Query('citaId') citaId: string) {
    let citaAceptada = await this.aceptarCita.ejecutar(citaId);
    return citaAceptada;
  }

  //@UseGuards(JWTDoctorGuard)
  @Put('cancelarcita')
  async cancelarCitaPut(@Query('citaId') citaId: string) {
    const CitaCancelada = await this.cancelarCita.ejecutar(citaId);
    return CitaCancelada;
  }

  @Put('bloquearcita')
  async bloquearCitaPut(@Query('citaId') citaId: string) {
    const CitaBloquear = await this.bloquearCita.ejecutar(citaId);
    return CitaBloquear;
  }

  @UseGuards(JWTDoctorGuard)
  @Put('suspendercita')
  async suspenderCitaPut(@Query('citaId') citaId: string) {
    const CitaSuspender = await this.suspenderCita.ejecutar(citaId);
    return CitaSuspender;
  }

  @Put('finalizarcita')
  async finalizarCitaPut(@Query('id') citaId: string) {
    const citaFinalizar = await this.finalizarCita.ejecutar(citaId);
    return citaFinalizar;
  }
}
