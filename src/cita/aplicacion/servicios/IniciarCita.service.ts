import { Cita } from "../../dominio/entidades/Cita";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { IniciarCitaDTO } from "../dto/IniciarCitaDTO";
import { CitaMapeador } from "../mappeador/CitaMapeador";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { GenerarTokenCita } from "./GenerarTokenCita.service";
import { ManejadorEventos } from "../../../commun/aplicacion/ManejadorEventos";

export class IniciarCita implements IServicioAplicacion<string,IniciarCitaDTO>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
        private readonly videollamadaCita: GenerarTokenCita,
        private readonly manejador: ManejadorEventos<any>
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

             cita.iniciarCita();   

             //AQUI SE DEBERIA HACER LO DE LOS EVENTOS
             var eventos = cita.obtenerEventos();
             cita.limpiarEventos();
 
         
             this.manejador.AddEvento(...eventos);
             //SE LE PASA EL MENSAJE AL MANEJADOR DE PUBLICAR EVENTOS
             this.manejador.Notify(cita.obtenerIdentificador().getCitaID().toString());
             //this.manejador.Notify(); //SE PUEDE O NO PASAR UN VALOR

            
            //guardamos en persistencia
            let  citaActualizada = await this.repositorioCita.actualizarStatusCita(cita.obtenerIdentificador().getCitaID().toString(), cita.getStatus().statusCita.toString());
            this.logger.log('La Cita con Identificador ' + datos + ' fue iniciada', '');
            
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