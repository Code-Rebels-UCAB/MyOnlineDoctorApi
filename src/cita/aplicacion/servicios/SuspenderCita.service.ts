import { Resultado } from "../../../commun/aplicacion/Resultado";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { CitaMapeador } from "../mappeador/CitaMapeador";
import { Cita } from "../../../cita/dominio/entidades/Cita";
import { CitaDataDTO } from "../dto/CitaDataDTO";
import { ManejadorEventos } from "../../../commun/aplicacion/ManejadorEventos";



export class SuspenderCita implements IServicioAplicacion<string,CitaDataDTO>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
        private readonly manejador: ManejadorEventos<any>
    ) {}


    async ejecutar(datos: string): Promise<Resultado<CitaDataDTO>> {
        try{

            //Obtenemos de Persistencia
            const citaPersit = await this.repositorioCita.obtenerCitaById(datos);

            //Mapeamos a Aplicacion
            var CitaDataDTO = CitaMapeador.covertirInfraestructuraAplicacion(citaPersit);

            //Mapeamos a Dominio
            var CitaVO = CitaMapeador.convertirAplicacionDominio(CitaDataDTO);
            

            //Creamos la cita en el modelo de Dominio
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

            cita.suspenderCita();
            
            var eventos = cita.obtenerEventos();
            cita.limpiarEventos();

            //guardamos en persistencia
            let  citaActualizada = await this.repositorioCita.actualizarStatusCita(cita.obtenerIdentificador().getCitaID().toString(), cita.getStatus().statusCita.toString());
            this.logger.log('La Cita con Identificador ' + datos + ' fue suspendida', '');
            
            //Mapeo respuesta de Infrastructura a Aplicacion
            var CitaSuspendida = CitaMapeador.covertirInfraestructuraAplicacion(citaActualizada);

            this.manejador.AddEvento(...eventos);
      
            this.manejador.Notify(cita.obtenerIdentificador().getCitaID().toString());
     
            
            return Resultado.Exito<CitaDataDTO>(CitaSuspendida);
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }
    }
}