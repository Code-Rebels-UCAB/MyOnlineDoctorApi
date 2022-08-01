import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BuscarCantidadTodosLosPacientes } from '../../aplicacion/servicios/BuscarCantidadPacientesSistema.service';
import { GuardarTokenPaciente } from '../../aplicacion/servicios/GuardarTokenPaciente.service';
import { BuscarPacienteNombre } from '../../aplicacion/servicios/BuscarPacienteNombre.service';
import { TokenPacienteDTO } from '../../aplicacion/dto/TokenPacienteDTO';
import { ObtenerInfoPersonalPaciente } from '../../aplicacion/servicios/ObtenerInfoPersonalPaciente.service';
import { RepositorioPaciente } from '../adaptadores/RepositorioPaciente';
import { PacienteORM } from '../persistencia/Paciente.orm';
import { ConsultarPacienteRespuestaDTO } from '../../../paciente/aplicacion/dto/queries/ConsultarPaciente.query';
import { BuscarPacienteTelefono } from '../../aplicacion/servicios/BuscarPacienteTelefono.service';
import { PacientePersistenciaDTO } from '../dto/PacientePersistenciaDTO';
import { RegistrarPaciente } from '../../aplicacion/servicios/RegistrarPaciente.service';
import { JwtPacienteGuard } from '../autenticacion/guards/paciente.guard';
import { ObtenerPaciente } from '../autenticacion/decoradores/obtener.paciente.decorador';
import { PacienteAutenticacionDTO } from '../dto/PacienteAutenticacionDTO';
import { BloquearPaciente } from '../../aplicacion/servicios/BloquearPaciente.service';
import { SuspenderPaciente } from '../../aplicacion/servicios/SuspenderPaciente.service';

@Controller('api/paciente')
export class PacienteController {
  constructor(
    @Inject(BuscarCantidadTodosLosPacientes)
    private readonly buscarCantidad: BuscarCantidadTodosLosPacientes,
    @Inject(GuardarTokenPaciente)
    private readonly GuardarToken: GuardarTokenPaciente,
    @Inject(BuscarPacienteNombre)
    private readonly buscarPacienteNombre: BuscarPacienteNombre,
    @Inject(BuscarPacienteTelefono)
    private readonly buscarPacienteTelefono: BuscarPacienteTelefono,
    @Inject(RepositorioPaciente)
    private readonly repositorioPaciente: RepositorioPaciente,
    @Inject(ObtenerInfoPersonalPaciente)
    private readonly ObtenerInfoPersonalPaciente: ObtenerInfoPersonalPaciente,
    @Inject(RegistrarPaciente)
    private readonly resgistrarPaciente: RegistrarPaciente,
    @Inject(BloquearPaciente)
    private readonly bloquearPaciente: BloquearPaciente,
    @Inject(SuspenderPaciente)
    private readonly suspenderPaciente: SuspenderPaciente,
  ) {}

  @Get('buscar/todos')
  async getCantidadPacientes(@Query('contexto') contexto?: string) {
    const cantidad = await this.buscarCantidad.ejecutar(contexto);
    return cantidad;
  }

  @Patch('guardar/token')
  async patchGuardarToken(@Body() datos: TokenPacienteDTO) {
    const token = await this.GuardarToken.ejecutar(datos);
    return token;
  }

  @Get('user')
  async getUser(@Query('id') id: string) {
    const paciente: PacienteORM =
      await this.repositorioPaciente.obtenerPacienteById(id);
    return paciente;
  }

  //@UseGuards(JwtPacienteGuard)
  @Get('info')
  async getPacienteInfo(@Query('id') id: string) {
    const paciente =  await this.ObtenerInfoPersonalPaciente.ejecutar(id);
    return paciente;
  }

  @Get('filtrar/nombre')
  async getByNombreOrApellido(@Query('nombre') nombre: string) {
    const pacientes = await this.buscarPacienteNombre.ejecutar(nombre);
    return pacientes;
  }

  @Get('filtrar/telefono')
  async getByNumberPhone(@Query('telefono') telefono: string) {
    const pacientes = await this.buscarPacienteTelefono.ejecutar(telefono);
    return pacientes;
  }

  @Post('/registrarse')
  async postRegistarPaciente(@Body() datos: PacientePersistenciaDTO){
    return await this.resgistrarPaciente.ejecutar(datos);
  }

  @Put('bloquear')
  async bloquear(@Query('id') id: string) {
    const resultado = await this.bloquearPaciente.ejecutar(id);
    return resultado;
  }

  @Put('suspender')
  async suspender(@Query('id') id: string) {
    const resultado = await this.suspenderPaciente.ejecutar(id);
    return resultado;
  }
}
