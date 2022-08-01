import { Body, Controller, Inject, Post, Put } from '@nestjs/common';
import { RegistroMedicoDTO } from '../../aplicacion/dto/RegistroMedicoDTO';
import { CrearRegistroMedico } from '../../../registro_medico/aplicacion/servicios/CrearRegistroMedico.service';
import { EditarRegistroMedico } from '../../../registro_medico/aplicacion/servicios/EditarRegistroMedico.service';



@Controller('api/registroMedico')
export class RegistroMedicoController {
  constructor(
    @Inject(CrearRegistroMedico)
    private readonly crearRegistroMedico: CrearRegistroMedico,
    @Inject(EditarRegistroMedico)
    private readonly editarRegistroMedico: EditarRegistroMedico,
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

}
