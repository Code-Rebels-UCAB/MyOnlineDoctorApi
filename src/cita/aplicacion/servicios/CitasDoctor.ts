import { ILogger } from "../../../commun/aplicacion/ILogger";
import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { IExcepcion } from "src/commun/dominio/excepcciones/IExcepcion";
import { CitaTodasDTO } from "../dto/CitasTodasDTO";




export class CitasDoctor implements IServicioAplicacion<string,CitaTodasDTO[]>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
    ) {}


    async ejecutar(doctorid: string): Promise<Resultado<CitaTodasDTO[]>> {
        try{
            const Citas:CitaTodasDTO[] = await this.repositorioCita.obtenerCitasDeDoctor(doctorid);
            this.logger.log("El doctor tiene un total de " + Citas.length.toString() + ' citas', '');
            return Resultado.Exito<CitaTodasDTO[]>(Citas);
            

        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }

    }



}