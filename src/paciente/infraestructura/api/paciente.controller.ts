import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import { BuscarCantidadTodosLosPacientes } from '../../aplicacion/servicios/BuscarCantidadPacientesSistema.service';
import { GuardarTokenPaciente } from '../../aplicacion/servicios/GuardarTokenPaciente.service';
import { BuscarPacienteNombre } from '../../aplicacion/servicios/BuscarPacienteNombre.service';
import { TokenPacienteDTO } from '../../aplicacion/dto/TokenPacienteDTO';
import { RepositorioPaciente } from '../adaptadores/RepositorioPaciente';
import { PacienteORM } from '../persistencia/Paciente.orm';

@Controller('api/paciente')
export class PacienteController {
  constructor(
    @Inject(BuscarCantidadTodosLosPacientes)
    private readonly buscarCantidad: BuscarCantidadTodosLosPacientes,
    @Inject(GuardarTokenPaciente)
    private readonly GuardarToken: GuardarTokenPaciente,
    @Inject(BuscarPacienteNombre)
    private readonly buscarPacienteNombre: BuscarPacienteNombre,
    @Inject(RepositorioPaciente)
    private readonly repositorioPaciente: RepositorioPaciente,
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

  @Get('filtrar/nombre')
  async getByNombreOrApellido(@Query('nombre') nombre: string) {
    const pacientes = await this.buscarPacienteNombre.ejecutar(nombre);
    return pacientes;
  }


}
