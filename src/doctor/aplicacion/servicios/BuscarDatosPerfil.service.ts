import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { PerfilDoctorDTO } from "../dtos/PerfilDoctorDTO";
import { IRepositorioDoctor } from "../puertos/IRepositorioDoctor";


export class BuscarDatosPerfil implements IServicioAplicacion<string, PerfilDoctorDTO>{

    constructor(
        private readonly logger: ILogger,
        private readonly repositorioDoctor: IRepositorioDoctor,
    ) {}

    async ejecutar(doctorId: string): Promise<Resultado<PerfilDoctorDTO>> {

        try{
            //return Resultado.Exito<PerfilDoctorDTO>(null);
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }
    }

}