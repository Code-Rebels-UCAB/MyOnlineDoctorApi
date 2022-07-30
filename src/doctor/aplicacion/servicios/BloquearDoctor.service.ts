import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioDoctor } from "../puertos/IRepositorioDoctor";


export class BloquearDoctor implements IServicioAplicacion<string, void>{

    constructor(
        private readonly logger: ILogger,
        private readonly repositorioDoctor: IRepositorioDoctor,
    ) {}

    async ejecutar(doctorId: string): Promise<Resultado<void>> {

        try{
            //console.log(doctorId);
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }
    }

}