import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { CitaSolicitadasDTO } from "../dto/CitasSolicitadasDTO";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";




export class CitasSolicitadasDoctor implements IServicioAplicacion<string,CitaSolicitadasDTO[]>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
    ) {}


    async ejecutar(doctorid: string): Promise<Resultado<CitaSolicitadasDTO[]>> {
        try{
            const CitasSolicidas:CitaSolicitadasDTO[] = await this.repositorioCita.obtenerCitaDeDoctorByStatus('Solicitada',doctorid);
            if (CitasSolicidas.length > 0) {
                this.logger.log("Citas Solicitas al Doctor: " + CitasSolicidas[0].doctor.p_nombre + CitasSolicidas[0].doctor.p_apellido, '');
            }
            return Resultado.Exito<CitaSolicitadasDTO[]>(CitasSolicidas);
            

        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }

    }



}
