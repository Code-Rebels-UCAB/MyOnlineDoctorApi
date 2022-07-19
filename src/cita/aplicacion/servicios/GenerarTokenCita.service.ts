import { ILogger } from "src/commun/aplicacion/ILogger";
import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { Resultado } from "src/commun/aplicacion/Resultado";
import { IExcepcion } from "src/commun/dominio/excepcciones/IExcepcion";
import { VideollamadaCitaDTO } from "../dto/VideollamadaCitaDTO";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { IVideollamadaCita } from "../puertos/IVideollamaCita";


export class GenerarTokenCita implements IServicioAplicacion<string,VideollamadaCitaDTO>{

    public constructor (
        private readonly logger: ILogger,
        private readonly videollamadaCita: IVideollamadaCita,
        private readonly repositorioCita: IRepositorioCita
    ) {}

    async ejecutar(citaid: string): Promise<Resultado<VideollamadaCitaDTO>> {
        try{
            const nombreCanal = citaid;
            const tokenTemp = await this.videollamadaCita.generarTokenVideollamada(nombreCanal);
            const datosVideollamada: VideollamadaCitaDTO = {
                nombreCanal:nombreCanal, 
                tokenTemp:tokenTemp
            };

            this.logger.log("Generación de token temporal para la cita con identificador " + citaid, "Token:" +  tokenTemp);

            await this.repositorioCita.actualizarDatosVideollamadaCita(citaid,nombreCanal,tokenTemp);
            this.logger.log(`La cita con identificador ${citaid} ha sido modificada`, "");

            return Resultado.Exito<VideollamadaCitaDTO>(datosVideollamada);
        }catch(error){
            const errores: IExcepcion = error;
            this.logger.error('Error inesperado: ', errores.mensaje);

            return Resultado.Falla(error);
        }
    }

}