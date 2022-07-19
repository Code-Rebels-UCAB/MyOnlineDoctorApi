import { Resultado } from "../../../commun/aplicacion/Resultado";
import { ILogger } from "../../../commun/aplicacion/ILogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { CitaMapeador } from "../mappeador/CitaMapeador";
import { Cita } from "../../../cita/dominio/entidades/Cita";
import { CitaDataDTO } from "../dto/CitaDataDTO";




export class BloquearCita implements IServicioAplicacion<string,CitaDataDTO>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
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

            //Generamos el Evento de Dominio
            cita.bloquearCita();
            //AQUI SE DEBERIA HACER LO DE LOS EVENTOS
            //var eventos = cita.obtenerEventos();
            //cita.limpiarEventos();
            
            //guardamos en persistencia
            let  citaActualizada = await this.repositorioCita.actualizarStatusCita(cita.obtenerIdentificador().getCitaID().toString(), cita.getStatus().statusCita.toString());
            this.logger.log('La Cita con Identificador ' + datos + ' fue bloqueada', '');
            
            //Mapeo respuesta de Infrastructura a Aplicacion
            var CitaBloqueada = CitaMapeador.covertirInfraestructuraAplicacion(citaActualizada);
            return Resultado.Exito<CitaDataDTO>(CitaBloqueada);
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }
    }
}