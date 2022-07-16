import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { BuscarDoctorEspecialidad } from '../../aplicacion/servicios/BuscarDoctorEspecialidad';


@Controller('api/doctor')
export class DoctorController {
  constructor(
    @Inject(BuscarDoctorEspecialidad)
    private readonly buscarDoctorEsp: BuscarDoctorEspecialidad,
  ) {}

  @Get('filtrar/especialidad')
  async getTodo(@Query('especialidad') especialidad: string) {
    const doctores = await this.buscarDoctorEsp.ejecutar(especialidad);
    return doctores;
  }

}
