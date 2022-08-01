import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { AutenticacionDatosDTO } from "./dto/AutenticacionDatosDTO";
import { JwtToken } from "./dto/jwt.token";
import { IEncriptarContrasena } from "../../../paciente/aplicacion/puertos/IEncriptarContraseña";
import { IRepositorioPaciente } from "../../../paciente/aplicacion/puertos/IRepositorioPaciente";

@Injectable()
export class ServicioAutenticacion {
    constructor(
        private readonly jwtServicio: JwtService,
        @Inject(IRepositorioPaciente)
        private readonly repositorioPaciente: IRepositorioPaciente,
        @Inject(IEncriptarContrasena) 
        private readonly contrasenaEncriptada: IEncriptarContrasena,
    ){}

    async validarPaciente(datos : AutenticacionDatosDTO) {
        const {correoPaciente, passwordPaciente} = datos;
        const paciente = await this.repositorioPaciente.buscarDatosIniciarSesionPaciente(correoPaciente);
        if(paciente && await this.contrasenaEncriptada.chequearContrasena(passwordPaciente, paciente.contrasena)){
            const payload: JwtToken = {
                idPaciente: paciente.id_paciente
            }
            const tokenDeAcceso = await this.jwtServicio.sign(payload);
            return Resultado.Exito<{tokenDeAcceso}>({tokenDeAcceso});      
        }

        throw new UnauthorizedException();
    }

}