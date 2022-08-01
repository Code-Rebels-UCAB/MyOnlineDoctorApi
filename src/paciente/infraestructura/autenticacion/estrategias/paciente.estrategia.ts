import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "../../../../commun/infraestructura/config/config.service";
import { IRepositorioPaciente } from "../../../../paciente/aplicacion/puertos/IRepositorioPaciente";
import { PacienteAutenticacionDTO } from "../../dto/PacienteAutenticacionDTO";
import { JwtToken } from "../dto/jwt.token";

@Injectable()
export class PacienteEstrategia extends PassportStrategy(Strategy, 'jwt-paciente'){
    constructor(
      @Inject(IRepositorioPaciente)
        private readonly repositorioPaciente: IRepositorioPaciente,
        private readonly configService: ConfigService
      ) {
        super({
          secretOrKey: configService.get('SECRET'),
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
      }

    async validate(payload: JwtToken){
        const { idPaciente } = payload;
        const paciente = await this.repositorioPaciente.obtenerPacienteById(idPaciente);
        if(!paciente){
            throw new UnauthorizedException();
        }

        const pacienteAutenticadoDTO: PacienteAutenticacionDTO = {
          id_paciente: paciente.idPaciente,
          p_nombre: paciente.primer_nombre,
          s_nombre: paciente.segundo_nombre,
          p_apellido: paciente.primer_apellido,
          s_apellido: paciente.segundo_apellido,
          fecha_nacimiento: paciente.fechaNacimiento,
          telefono: paciente.telefono,
          correo: paciente.email,
          sexo: paciente.genero,
          altura: paciente.altura,
          peso: paciente.peso,
          contrasena: paciente.password,
          status_suscripcion: paciente.statusSuscripcion,
          alergia: paciente.alergia,
          antecedentes: paciente.antecedentes,
          operacion: paciente.operaciones,
          token_Firebase: paciente.tokenF
        };

        return pacienteAutenticadoDTO;
    }


}