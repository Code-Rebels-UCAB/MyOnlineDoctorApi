import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../../../commun/infraestructura/config/config.service';
import { IRepositorioPaciente } from '../../../../paciente/aplicacion/puertos/IRepositorioPaciente';
import { PacienteAutenticacionDTO } from '../../dto/PacienteAutenticacionDTO';
import { PacienteORM } from '../../persistencia/Paciente.orm';
import { JwtToken } from '../dto/jwt.token';

@Injectable()
export class PacienteEstrategia extends PassportStrategy(
  Strategy,
  'jwt-paciente',
) {
  constructor(
    @Inject(IRepositorioPaciente)
    private readonly repositorioPaciente: IRepositorioPaciente,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
    });
  }

  async validate(payload: JwtToken) {
    const { idPaciente } = payload;
    const paciente: PacienteORM =
      await this.repositorioPaciente.obtenerPacienteById(idPaciente);
    if (!paciente) {
      throw new UnauthorizedException();
    }

    const pacienteAutenticadoDTO: PacienteAutenticacionDTO = {
      id_paciente: paciente.id_paciente,
      p_nombre: paciente.p_nombre,
      s_nombre: paciente.s_nombre,
      p_apellido: paciente.p_apellido,
      s_apellido: paciente.s_apellido,
      fecha_nacimiento: paciente.fecha_nacimiento.toString(),
      telefono: paciente.telefono,
      correo: paciente.correo,
      sexo: paciente.sexo,
      altura: paciente.altura.toString(),
      peso: paciente.peso.toString(),
      contrasena: paciente.contrasena,
      status_suscripcion: paciente.status_suscripcion,
      alergia: paciente.alergia,
      antecedentes: paciente.antecedentes,
      operacion: paciente.operacion,
      token_Firebase: paciente.tokenF,
    };

    return pacienteAutenticadoDTO;
  }
}
