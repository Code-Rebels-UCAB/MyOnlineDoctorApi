import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegistroMedicoDTO } from '../../aplicacion/dto/RegistroMedicoDTO';
import { CrearRegistroMedico } from '../../../registro_medico/aplicacion/servicios/CrearRegistroMedico.service';



@Controller('api/registroMedico')
export class RegistroMedicoController {
  constructor(
    @Inject(CrearRegistroMedico)
    private readonly crearRegistroMedico: CrearRegistroMedico,
  ) {}

  @Post('crear')
  async postCrearRegistro(@Body() datos: RegistroMedicoDTO) {
    const RegistroMedico = await this.crearRegistroMedico.ejecutar(datos);
    return RegistroMedico;
  }

}
