import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ServicioAutenticacion } from "./autenticacion.service";
import { AutenticacionDatosDTO } from "./dto/AutenticacionDatosDTO";

@Controller('api/paciente/auth')
export class AutenticacionController {

    constructor(
        @Inject(ServicioAutenticacion)
        private readonly autenticacion: ServicioAutenticacion
    ) {}

    @Post('iniciarsesion')
    async iniciarsesion(@Body() datos: AutenticacionDatosDTO) {
        return await this.autenticacion.validarPaciente(datos);
    }

}