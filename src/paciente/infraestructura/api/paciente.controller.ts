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
import { GuardarTokenPaciente } from 'src/paciente/aplicacion/servicios/guardarTokenPaciente.service';
import { TokenPacienteDTO } from 'src/paciente/aplicacion/dto/TokenPacienteDTO';

@Controller('api/paciente')
export class PacienteController {
  constructor(
    @Inject(BuscarCantidadTodosLosPacientes)
    private readonly buscarCantidad: BuscarCantidadTodosLosPacientes,
    @Inject(GuardarTokenPaciente)
    private readonly GuardarToken: GuardarTokenPaciente,
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
}

