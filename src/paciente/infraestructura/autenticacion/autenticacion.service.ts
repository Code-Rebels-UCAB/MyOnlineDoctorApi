import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { RepositorioPaciente } from "../adaptadores/RepositorioPaciente";
import { AutenticacionDatosDTO } from "./dto/AutenticacionDatosDTO";
import * as bcrypt from 'bcrypt';
import { JwtToken } from "./dto/jwt.token";

@Injectable()
export class ServicioAutenticacion {
    constructor(
        private readonly jwtServicio: JwtService,
        private readonly repositorioPaciente: RepositorioPaciente

    ){}

    async validarPaciente(datos : AutenticacionDatosDTO) {
        const {correoPaciente, passwordPaciente} = datos;
        const paciente = await this.repositorioPaciente.buscarDatosIniciarSesionPaciente(correoPaciente);
        if(paciente && await this.checkPassword( passwordPaciente, paciente.contrasena)){
            const payload: JwtToken = {
                idPaciente: paciente.id_paciente
            }
            const tokenDeAcceso = await this.jwtServicio.sign(payload);
            return Resultado.Exito<{tokenDeAcceso}>({tokenDeAcceso});      
        }

        throw  new UnauthorizedException();
        
    }


    async checkPassword(pacientePassword: string, requestPassword){
        return await bcrypt.compare(pacientePassword, requestPassword);
    }
}