import { ILogger } from "../../../commun/aplicacion/ILogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { AgendarCitaDTO } from "../dto/AgendarCitaDTO";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { CitaMapeador } from "../mappeador/CitaMapeador";
import { Cita } from "../../dominio/entidades/Cita";


export class AgendarCita implements IServicioAplicacion<AgendarCitaDTO,any>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
    ) {}


    async ejecutar(datos: AgendarCitaDTO): Promise<Resultado<any>> {
        try{
            const citaPersit = await this.repositorioCita.obtenerCitaById(datos.idCita);

            var CitaDataDTO = CitaMapeador.covertirInfraestructuraAplicacion(citaPersit);
            var CitaVO = CitaMapeador.convertirAplicacionDominio(CitaDataDTO);
            var cita = new Cita(
              CitaVO.idCita,
              CitaVO.status,
              CitaVO.modalidad,
              CitaVO.motivo,
              CitaVO.idPaciente,
              CitaVO.idDoctor,
              CitaVO.fechaCita,
              CitaVO.horaCita,
              CitaVO.duracion,
            );

            cita.agendarCita(CitaVO.fechaCita,CitaVO.horaCita, CitaVO.duracion);
            //var eventos = cita.obtenerEventos();
            //cita.limpiarEventos();

            //const CitaActualizada = await this.repositorioCita.actualizarCitaAgendada(datos.fechaCita,datos.horaCita,datos.idCita);
            //this.logger.log("El doctor tiene un total de " + Citas.length.toString() + ' citas', '');
            return Resultado.Exito<any>(CitaDataDTO);
            

        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }

    }



}