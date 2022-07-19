import { Cita } from "src/cita/dominio/entidades/Cita";
import { ILogger } from "src/commun/aplicacion/ILogger";
import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { Resultado } from "src/commun/aplicacion/Resultado";
import { IExcepcion } from "src/commun/dominio/excepcciones/IExcepcion";
import { IniciarCitaDTO } from "../dto/IniciarCitaDTO";
import { CitaMapeador } from "../mappeador/CitaMapeador";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { GenerarTokenCita } from "./GenerarTokenCita.service";

export class IniciarCita implements IServicioAplicacion<string,IniciarCitaDTO>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
        private readonly videollamadaCita: GenerarTokenCita
    ) {}


    async ejecutar(datos: string): Promise<Resultado<IniciarCitaDTO>> {
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
            cita.iniciarCita();
            //AQUI SE DEBERIA HACER LO DE LOS EVENTOS
            //var eventos = cita.obtenerEventos();
            //cita.limpiarEventos();
            
            //guardamos en persistencia
            let  citaActualizada = await this.repositorioCita.actualizarStatusCita(cita.obtenerIdentificador().getCitaID().toString(), cita.getStatus().statusCita.toString());
            this.logger.log('La Cita con Identificador ' + datos + ' fue inciada', '');
            
            //Mapeo respuesta de Infrastructura a Aplicacion
            let citaIniciada = CitaMapeador.covertirInfraestructuraAplicacion(citaActualizada);

            const videollamadaCita = await this.videollamadaCita.ejecutar(citaActualizada.id_cita);
            let citaIniciadaDTO: IniciarCitaDTO = {
                idCita: citaIniciada.idCita,
                idPaciente: citaIniciada.idPaciente,
                idDoctor: citaIniciada.idDoctor,
                status: citaIniciada.status,
                modalidad: citaIniciada.modalidad,
                motivo: citaIniciada.motivo,
                fechaCita: citaIniciada.fechaCita,
                horaCita: citaIniciada.horaCita,
                duracion: citaIniciada.duracion,
                videollamada:{
                    nombreCanal: videollamadaCita.valor.nombreCanal,
                    tokenTemp: videollamadaCita.valor.tokenTemp
                }
            };

            return Resultado.Exito<IniciarCitaDTO>(citaIniciadaDTO);
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }

    }



}