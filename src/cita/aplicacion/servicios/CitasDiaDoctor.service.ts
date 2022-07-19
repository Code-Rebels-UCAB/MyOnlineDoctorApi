import { ILogger } from "../../../commun/aplicacion/ILogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { CitasAlDiaDTO } from "../dto/CitasAlDiaDTO";




export class CitasDiaDoctor implements IServicioAplicacion<string,CitasAlDiaDTO[]>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
    ) {}


    async ejecutar(doctorid: string): Promise<Resultado<CitasAlDiaDTO[]>> {
        try{
            const CitasAlDia: CitasAlDiaDTO[] = await this.repositorioCita.obtenerCitasDelDiaDoctor(doctorid);
            if (CitasAlDia.length > 0) {
                this.logger.log("El Doctor tiene el dia de hoy " + CitasAlDia.length + ' citas', '');
            }

            return Resultado.Exito<CitasAlDiaDTO[]>(CitasAlDia);
            

        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }

    }



}
