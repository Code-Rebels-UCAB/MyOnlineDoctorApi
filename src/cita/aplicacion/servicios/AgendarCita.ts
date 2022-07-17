import { ILogger } from "../../../commun/aplicacion/ILogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { AgendarCitaDTO } from "../dto/AgendarCitaDTO";
import { CitaMapeadorInfraestructura } from "../../infraestructura/mapeador/CitaMapeadorInfraestructura";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";


export class AgendarCita implements IServicioAplicacion<AgendarCitaDTO,any>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
    ) {}


    async ejecutar(datos: AgendarCitaDTO): Promise<Resultado<any>> {
        try{
            const cita = await this.repositorioCita.obtenerCitaById(datos.idCita);

            //console.log(cita);
            var algo = CitaMapeadorInfraestructura.covertirInfraestructuraAplicacion(cita);
            console.log(algo);
            //const CitaActualizada = await this.repositorioCita.actualizarCitaAgendada(datos.fechaCita,datos.horaCita,datos.idCita);
            //this.logger.log("El doctor tiene un total de " + Citas.length.toString() + ' citas', '');
            return Resultado.Exito<any>(algo);
            

        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }

    }



}