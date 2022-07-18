import { ILogger } from "../../../commun/aplicacion/ILogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioPaciente } from "../puertos/IRepositorioPaciente";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { Paciente } from "src/paciente/dominio/entidades/Paciente";
import { TokenPacienteDTO } from "../dto/TokenPacienteDTO";
import { PacienteTokenMapeador } from "../mappeador/PacienteTokenMapeador";

export class GuardarTokenPaciente implements IServicioAplicacion<TokenPacienteDTO,string>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioPaciente: IRepositorioPaciente,
    ) {}


    async ejecutar(datos: TokenPacienteDTO): Promise<Resultado<string>> {
        try{
            
            let datosP = PacienteTokenMapeador.convertirAplicacionInfraestructura(datos);
            const tokenGuardado = await this.repositorioPaciente.guardarTokenPaciente(datosP.id_paciente,datosP.token_Firebase);
            
            this.logger.log("Actualizacion del token firebase para el paciente con identificador " + datosP.id_paciente, "Token:" +  datosP.token_Firebase);
            
            await this.repositorioPaciente.guardarTokenPaciente(datosP.id_paciente,datosP.token_Firebase);
            this.logger.log('El paciente con Identificador ' + datosP.id_paciente + ' Ha sido Modificado', '');

            return Resultado.Exito<string>(null);

        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }

    }

}