import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { RepositorioPaciente } from "../../adaptadores/RepositorioPaciente";
import { JwtToken } from "../dto/jwt.token";

@Injectable()
export class PacienteEstrategia extends PassportStrategy(Strategy, 'jwt-paciente'){
    constructor(
        private readonly repositorioPaciente: RepositorioPaciente
      ) {
        super({
          secretOrKey: 'LORENZO',
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
      }

    async validate(payload: JwtToken){
        const { idPaciente } = payload;
        const paciente = await this.repositorioPaciente.obtenerPacienteById(idPaciente);
        if(!paciente){
            throw new UnauthorizedException();
        }

        return paciente;
    }


}