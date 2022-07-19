import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RepositorioPaciente } from '../adaptadores/RepositorioPaciente';
import { buscarCantidadTodosLosPacientes } from '../../aplicacion/servicios/buscarCantidadPacientesSistema.service';
import { PacienteORM } from '../persistencia/Paciente.orm';

@Controller('api/paciente')
export class PacienteController {
  constructor(
    @Inject(buscarCantidadTodosLosPacientes)
    private readonly buscarCantidad: buscarCantidadTodosLosPacientes,
    @Inject(RepositorioPaciente)
    private readonly repositorioPaciente: RepositorioPaciente,
  ) {}

  @Get('buscar/todos')
  async getCantidadPacientes(@Query('contexto') contexto?: string) {
    const cantidad = await this.buscarCantidad.ejecutar(contexto);
    return cantidad;
  }

  @Get('user')
  async getUser(@Query ('id') id: string) {
    const paciente: PacienteORM = await this.repositorioPaciente.obtenerPacienteById(id);
    return paciente;
  }

}
