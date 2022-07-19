import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { BuscarDoctorNombreApellido } from '../../aplicacion/servicios/BuscarDoctorNombreApellido.service';
import { CalificarDoctor } from '../../aplicacion/servicios/CalificarDoctor.service';
import { BuscarDoctorEspecialidad } from '../../aplicacion/servicios/BuscarDoctorEspecialidad.service';
import { CalificarDoctorDTO } from '../../aplicacion/dtos/CalificarDoctorDTO';
import { BuscarDoctorTop } from '../../../doctor/aplicacion/servicios/BuscarDoctorTop.service';


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

  @Put('calificar')
  async updateCalificar(@Body() calificacion: CalificarDoctorDTO) {
    await this.calificarDoctor.ejecutar(calificacion);
    return;
  }

}
 