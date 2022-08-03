import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BuscarDoctorNombreApellido } from '../../aplicacion/servicios/BuscarDoctorNombreApellido.service';
import { CalificarDoctor } from '../../aplicacion/servicios/CalificarDoctor.service';
import { BuscarDoctorEspecialidad } from '../../aplicacion/servicios/BuscarDoctorEspecialidad.service';
import { CalificarDoctorDTO } from '../../aplicacion/dtos/CalificarDoctorDTO';
import { BuscarDoctorTop } from '../../../doctor/aplicacion/servicios/BuscarDoctorTop.service';
import { BuscarTodosDoctores } from '../../../doctor/aplicacion/servicios/BuscarTodosDoctores.service';
import { AutenticarDoctorDTO } from '../../aplicacion/dtos/AutenticarDoctorDTO';
import { AutenticarDoctor } from '../../aplicacion/servicios/AutenticarDoctor.service';
import { BuscarDatosPerfil } from '../../aplicacion/servicios/BuscarDatosPerfil.service';
import { BloquearDoctor } from '../../aplicacion/servicios/BloquearDoctor.service';
import { JWTDoctorGuard } from '../autenticacion/guards/JWTDoctor.guard';
import { ObtenerDoctor } from '../autenticacion/decoradores/ObtenerDoctor.decorator';
import { DoctorAutenticacionDTO } from '../autenticacion/dtos/DoctorAutenticacionDTO';

@Controller('api/doctor')
export class DoctorController {
  constructor(
    @Inject(BuscarDoctorEspecialidad)
    private readonly buscarDoctorEsp: BuscarDoctorEspecialidad,
    @Inject(BuscarDoctorNombreApellido)
    private readonly buscarDoctorNombreApellido: BuscarDoctorNombreApellido,
    @Inject(CalificarDoctor)
    private readonly calificarDoctor: CalificarDoctor,
    @Inject(BuscarDoctorTop)
    private readonly buscarDoctorTop: BuscarDoctorTop,
    @Inject(BuscarTodosDoctores)
    private readonly buscarTodosDoctores: BuscarTodosDoctores,
    @Inject(AutenticarDoctor)
    private readonly autenticarDoctor: AutenticarDoctor,
    @Inject(BuscarDatosPerfil)
    private readonly buscarDatosPerfil: BuscarDatosPerfil,
    @Inject(BloquearDoctor)
    private readonly bloquearDoctor: BloquearDoctor,
  ) {}

  @Get('filtrar/especialidad')
  async getByEspecialidad(@Query('especialidad') especialidad: string) {
    const doctores = await this.buscarDoctorEsp.ejecutar(especialidad);
    return doctores;
  }

  @Get('filtrar/nombre')
  async getByNombreOrApellido(@Query('nombre') nombre: string) {
    const doctores = await this.buscarDoctorNombreApellido.ejecutar(nombre);
    return doctores;
  }

  @Get('filtrar/top')
  async getByTop() {
    const doctores = await this.buscarDoctorTop.ejecutar();
    return doctores;
  }

  //@UseGuards(JwtPacienteGuard)
  @Put('calificar')
  async updateCalificar(@Body() calificacion: CalificarDoctorDTO) {
    const doctor = await this.calificarDoctor.ejecutar(calificacion);
    return doctor;
  }

  @Get('todos')
  async getAll() {
    const doctores = await this.buscarTodosDoctores.ejecutar();
    return doctores;
  }

  @Put('autenticar')
  async autenticar(@Body() data: AutenticarDoctorDTO) {
    const response = await this.autenticarDoctor.ejecutar(data);
    return response;
  }

  @UseGuards(JWTDoctorGuard)
  @Get('perfil')
  async getDatosPerfil(@ObtenerDoctor() doctorObtenido: DoctorAutenticacionDTO) {
    const doctor = await this.buscarDatosPerfil.ejecutar(doctorObtenido.id_doctor);
    return doctor;
  }

   //@UseGuards(JWTDoctorGuard)
  @Put('bloquear/:doctorid')
  async updateBloquear(@Param('doctorid') doctorId: string) {
    return await this.bloquearDoctor.ejecutar(doctorId);
  }
}
