import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CrearRegistroMedicoDTO } from '../../../registro_medico/aplicacion/dto/CrearRegistroMedicoDTO';
import { CrearRegistroMedico } from '../../../registro_medico/aplicacion/servicios/CrearRegistroMedico.service';



@Controller('api/registroMedico')
export class RegistroMedicoController {
  constructor(
    @Inject(CrearRegistroMedico)
    private readonly crearRegistroMedico: CrearRegistroMedico,
  ) {}

  @Post('crear')
  async postCrearRegistro(@Body() datos: CrearRegistroMedicoDTO) {
    const RegistroMedico = await this.crearRegistroMedico.ejecutar(datos);
    return RegistroMedico;
  }

}
