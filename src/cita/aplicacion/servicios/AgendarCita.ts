import { ILogger } from "../../../commun/aplicacion/ILogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { AgendarCitaDTO } from "../dto/AgendarCitaDTO";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { CitaMapeador } from "../mappeador/CitaMapeador";
import { Cita } from "../../dominio/entidades/Cita";


export class AgendarCita implements IServicioAplicacion<AgendarCitaDTO,void>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
    ) {}


    async ejecutar(datos: AgendarCitaDTO): Promise<Resultado<void>> {
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
            //AQUI SE DEBERIA HACER LO DE LOS EVENTOS
            //var eventos = cita.obtenerEventos();
            //cita.limpiarEventos();

            await this.repositorioCita.actualizarCitaAgendada(datos.idCita,datos.fechaCita,datos.horaCita, datos.duracion);
            this.logger.log('La Cita con Identificador ' + datos.idCita + ' Ha sido Modificada', '');
            return Resultado.Exito<void>(null);
            

        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }

    }



}