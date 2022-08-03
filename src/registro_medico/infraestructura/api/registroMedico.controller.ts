import { Body, Controller, Get, Inject, Post, Put, Query,  UseGuards } from '@nestjs/common';
import { RegistroMedicoDTO } from '../../aplicacion/dto/RegistroMedicoDTO';
import { CrearRegistroMedico } from '../../../registro_medico/aplicacion/servicios/CrearRegistroMedico.service';
import { EditarRegistroMedico } from '../../../registro_medico/aplicacion/servicios/EditarRegistroMedico.service';
import { ObtenerRegistrosPaciente } from '../../../registro_medico/aplicacion/servicios/ObtenerRegistrosPaciente.service';
import { PacienteAutenticacionDTO } from '../../../paciente/infraestructura/dto/PacienteAutenticacionDTO';
import { JwtPacienteGuard } from '../../../paciente/infraestructura/autenticacion/guards/paciente.guard';
import { ObtenerPaciente } from '../../../paciente/infraestructura/autenticacion/decoradores/obtener.paciente.decorador';



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
  
 //@UseGuards(JWTDoctorGuard)
  @Post('crear')
  async postCrearRegistro(@Body() datos: RegistroMedicoDTO) {
    const RegistroMedico = await this.crearRegistroMedico.ejecutar(datos);
    return RegistroMedico;
  }

  //@UseGuards(JWTDoctorGuard)

  @Put('actualizar')
  async postActualizarRegistro(@Body() datos: RegistroMedicoDTO) {
    const RegistroMedico = await this.editarRegistroMedico.ejecutar(datos);
    return RegistroMedico;
  }

  @UseGuards(JwtPacienteGuard)
  @Get('getByPaciente')
  async getByPaciente(@ObtenerPaciente() datos: PacienteAutenticacionDTO) {
    return await this.obtenerRegistrosPaciente.ejecutar(datos.id_paciente);;
  }

}
