import { Body, Controller, Get, Inject, Post, Put, Query,  UseGuards } from '@nestjs/common';
import { RegistroMedicoDTO } from '../../aplicacion/dto/RegistroMedicoDTO';
import { CrearRegistroMedico } from '../../../registro_medico/aplicacion/servicios/CrearRegistroMedico.service';
import { EditarRegistroMedico } from '../../../registro_medico/aplicacion/servicios/EditarRegistroMedico.service';
import { ObtenerRegistrosPaciente } from '../../../registro_medico/aplicacion/servicios/ObtenerRegistrosPaciente.service';
import { PacienteAutenticacionDTO } from '../../../paciente/infraestructura/dto/PacienteAutenticacionDTO';
import { JwtPacienteGuard } from '../../../paciente/infraestructura/autenticacion/guards/paciente.guard';
import { ObtenerPaciente } from '../../../paciente/infraestructura/autenticacion/decoradores/obtener.paciente.decorador';
import { JWTDoctorGuard } from '../../../doctor/infraestructura/autenticacion/guards/JWTDoctor.guard';
import { DoctorAutenticacionDTO } from '../../../doctor/infraestructura/autenticacion/dtos/DoctorAutenticacionDTO';
import { ObtenerDoctor } from '../../../doctor/infraestructura/autenticacion/decoradores/ObtenerDoctor.decorator';



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
  
  @UseGuards(JWTDoctorGuard)
  @Post('crear')
  async postCrearRegistro(@ObtenerDoctor() datos: DoctorAutenticacionDTO,@Body() datos2: RegistroMedicoDTO) {
    datos2.IdDoctor = datos.id_doctor; 
    const RegistroMedico = await this.crearRegistroMedico.ejecutar(datos2);
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

  @Get('getByPacienteWeb')
  async getByPacienteWeb(@Query('id') id: string) {
    return await this.obtenerRegistrosPaciente.ejecutar(id);;
  }

}
