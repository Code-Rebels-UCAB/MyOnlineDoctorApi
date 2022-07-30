import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CrearHistoriaMedicaDTO } from 'src/historia_medica/aplicacion/dtos/CrearHistoriaMedicaDTO';
import { CrearRegistroMedico } from 'src/registro_medico/aplicacion/servicios/CrearRegistroMedico.service';



@Controller('api/registroMedico')
export class RegistroMedicoController {
  constructor(
    @Inject(CrearRegistroMedico)
    private readonly crearRegistroMedico: CrearRegistroMedico,
  ) {}

  @Post('crear')
  async postCrearRegistro(@Body() datos: CrearHistoriaMedicaDTO) {
    const RegistroMedico = await this.crearRegistroMedico.ejecutar(datos);
    return RegistroMedico;
  }

}
