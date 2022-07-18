import { ILogger } from "../../../commun/aplicacion/ILogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { CitaSolicitadasDTO } from "../dto/CitasSolicitadasDTO";
import { SolicitarCitaDTO } from "../dto/SolicitarCitaDTO";
import { Cita } from "../../dominio/entidades/Cita";
import { CitaMapeador } from "../mappeador/CitaMapeador";
import { CitaDataDTO } from "../dto/CitaDataDTO";


export class SolicitarCita implements IServicioAplicacion<SolicitarCitaDTO,void>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
    ) {}


    async ejecutar(datos: SolicitarCitaDTO): Promise<Resultado<void>> {
        try{
           // mapeamos de aplicacion a dominio
            let citaDominioMapeado = CitaMapeador.convertirSolicitarCitaADominio(datos);

            //creamos el agregado de cita
            let cita = Cita.solicitarCita(citaDominioMapeado.modalidad, citaDominioMapeado.motivo, citaDominioMapeado.idPaciente, citaDominioMapeado.idDoctor);
            
            //mapeamos a persistencia
            let citaPersistencia = CitaMapeador.convertirSolicitarCitaAPersistencia(cita);

            //guardamos la cita
            let cita_guardada = await this.repositorioCita.crearCita(citaPersistencia);

            return Resultado.Exito<void>(null);
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }

    }



}