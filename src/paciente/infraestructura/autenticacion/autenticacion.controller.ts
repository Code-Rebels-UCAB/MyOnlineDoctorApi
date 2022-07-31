import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ServicioAutenticacion } from "./autenticacion.service";
import { AutenticacionDatosDTO } from "./dto/AutenticacionDatosDTO";

@Controller('/auth')
export class AutenticacionController {

    constructor(
        @Inject(ServicioAutenticacion)
        private readonly autenticacion: ServicioAutenticacion
    ) {}

    @Post('buscar')
    async buscarDatos(@Body() datos: AutenticacionDatosDTO) {
        return await this.autenticacion.validarPaciente(datos);
    }
}