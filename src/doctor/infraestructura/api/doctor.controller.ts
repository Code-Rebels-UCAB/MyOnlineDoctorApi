import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { BuscarDoctorNombreApellido } from 'src/doctor/aplicacion/servicios/BuscarDoctorNombreApellido';
import { CalificarDoctor } from 'src/doctor/aplicacion/servicios/CalificarDoctor';
import { BuscarDoctorEspecialidad } from '../../aplicacion/servicios/BuscarDoctorEspecialidad';
import { CalificarDoctorDTO } from '../../aplicacion/dtos/CalificarDoctorDTO';


@Controller('api/doctor')
export class DoctorController {
  constructor(
    @Inject(BuscarDoctorEspecialidad)
    private readonly buscarDoctorEsp: BuscarDoctorEspecialidad,
    @Inject(BuscarDoctorNombreApellido)
    private readonly buscarDoctorNombreApellido: BuscarDoctorNombreApellido,
    @Inject(CalificarDoctor)
    private readonly calificarDoctor: CalificarDoctor,
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

  @Put('calificar')
  async updateCalificar(@Body() calificacion: CalificarDoctorDTO) {
    await this.calificarDoctor.ejecutar(calificacion);
    return 'success';
  }

}
