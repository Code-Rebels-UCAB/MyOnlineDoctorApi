import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
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
        private readonly repositorioCita: IRepositorioCita
    ) {}


    async ejecutar(datos: AgendarCitaDTO): Promise<Resultado<void>> {
        try{
            
            //GENERACION DEL EVENTO DE DOMINIO
            const CitaVo = CitaMapeador.convertirAgendarCitaADominio(datos);

            var cita = new Cita(CitaVo.idCita,null,null,null,null,null,CitaVo.fechaCita,CitaVo.horaCita,CitaVo.duracion);
            cita.agendarCita(CitaVo.fechaCita,CitaVo.horaCita, CitaVo.duracion);

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