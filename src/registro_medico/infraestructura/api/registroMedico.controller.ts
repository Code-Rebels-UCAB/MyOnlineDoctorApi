import { Body, Controller, Get, Inject, Post, Put, Query } from '@nestjs/common';
import { RegistroMedicoDTO } from '../../aplicacion/dto/RegistroMedicoDTO';
import { CrearRegistroMedico } from '../../../registro_medico/aplicacion/servicios/CrearRegistroMedico.service';
import { EditarRegistroMedico } from '../../../registro_medico/aplicacion/servicios/EditarRegistroMedico.service';
import { ObtenerRegistrosPaciente } from '../../../registro_medico/aplicacion/servicios/ObtenerRegistrosPaciente.service';



@Controller('api/registroMedico')
export class RegistroMedicoController {
  constructor(
    @Inject(CrearRegistroMedico)
    private readonly crearRegistroMedico: CrearRegistroMedico,
    @Inject(EditarRegistroMedico)
    private readonly editarRegistroMedico: EditarRegistroMedico,
    @Inject(ObtenerRegistrosPaciente)
    private readonly obtenerRegistrosPaciente: ObtenerRegistrosPaciente,
  ) {}
  

  @Post('crear')
  async postCrearRegistro(@Body() datos: RegistroMedicoDTO) {
    const RegistroMedico = await this.crearRegistroMedico.ejecutar(datos);
    return RegistroMedico;
  }

  @Put('actualizar')
  async postActualizarRegistro(@Body() datos: RegistroMedicoDTO) {
    const RegistroMedico = await this.editarRegistroMedico.ejecutar(datos);
    return RegistroMedico;
  }

  @Get('getByPaciente')
  async getByPaciente(@Query('idPaciente') idPaciente: string) {
    return await this.obtenerRegistrosPaciente.ejecutar(idPaciente);;
  }

}
