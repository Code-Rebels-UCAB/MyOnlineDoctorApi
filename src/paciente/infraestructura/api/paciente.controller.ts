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
import { buscarCantidadTodosLosPacientes } from '../../aplicacion/servicios/buscarCantidadPacientesSistema';

@Controller('api/paciente')
export class PacienteController {
  constructor(
    @Inject(buscarCantidadTodosLosPacientes)
    private readonly buscarCantidad: buscarCantidadTodosLosPacientes,
  ) {}

  @Get('buscar/todos')
  async getCantidadPacientes(@Query('contexto') contexto?: string) {
    const cantidad = await this.buscarCantidad.ejecutar(contexto);
    return cantidad;
  }
}
