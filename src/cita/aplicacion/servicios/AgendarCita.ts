import { ILogger } from "../../../commun/aplicacion/ILogger";
import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { IExcepcion } from "src/commun/dominio/excepcciones/IExcepcion";
import { AgendarCitaDTO } from "../dto/AgendarCitaDTO";


export class AgendarCita implements IServicioAplicacion<AgendarCitaDTO,any>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
    ) {}


    async ejecutar(datos: AgendarCitaDTO): Promise<Resultado<any>> {
        try{
            const cita = await this.repositorioCita.obtenerCitaById(datos.idCita);
            console.log(cita);
            //const CitaDataDTO = CitaMapeadorIA.covertirInfraestructuraAplicacion(cita);
            //console.log(CitaDataDTO);



            //const CitaActualizada = await this.repositorioCita.actualizarCitaAgendada(datos.fechaCita,datos.horaCita,datos.idCita);
            //this.logger.log("El doctor tiene un total de " + Citas.length.toString() + ' citas', '');
            return Resultado.Exito<void>(cita);
            

        }
        catch (error) {
            //let errores: IExcepcion = error;
            //this.logger.error("Error inesperado:", errores.mensaje);
            //return Resultado.Falla(error);
        }

    }



}