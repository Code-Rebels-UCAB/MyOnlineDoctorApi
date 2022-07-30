import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioDoctor } from "../puertos/IRepositorioDoctor";
import { DoctorMapeador } from "../mapeadores/DoctorMapeador";
import { ManejadorEventos } from "../../../commun/aplicacion/ManejadorEventos";

export class BloquearDoctor implements IServicioAplicacion<string, void>{

    constructor(
        private readonly logger: ILogger,
        private readonly repositorioDoctor: IRepositorioDoctor,
        private readonly manejador: ManejadorEventos<string>
    ) {}

    async ejecutar(doctorId: string): Promise<Resultado<void>> {

        try{
            //........AGREGADO DE DOCTOR................
            const datosDoctor = await this.repositorioDoctor.obtenerDoctorById(doctorId); //SE OBTIENEN LOS DATOS DEL DOCTOR 
            const doctor = DoctorMapeador.covertirPersistenciaDominio(datosDoctor);  //SE MAPEAN ESOS DATOS Y OBTIENE EL DOCTOR DE DOMINIO

            //........EVENTOS DE DOMINIO................
            doctor.bloquearDoctor();  //SE GENERA EL EVENTO DE DOMINIO
            const eventos = doctor.obtenerEventos(); //SE OBTIENE EL EVENTO DE DOCTOR BLOQUEADO
            doctor.limpiarEventos(); //SE LIMPIA LA LISTA DE EVENTOS

            //........BLOQUEAR AL DOCTOR................
            const doctorBloqueado = await this.repositorioDoctor.bloquearDoctor(doctor.obtenerIdentificador().getDoctorID().toString()) //EL REPOSITORIO ACTUALIZA EL STATUS DEL DOCTOR A BLOQUEADO
            this.logger.log("Doctor: " + doctor.getNombreDoctor().getNombre() + ' ' + doctor.getNombreDoctor().getApellido(), 'Bloqueado');


            //........MANEJO DE EVENTOS................
            this.manejador.AddEvento(...eventos); //SE AGREGAN LOS EVENTOS AL MANEJADOR
            this.manejador.Notify(doctor.obtenerIdentificador().getDoctorID().toString()); //SE LE PASA EL MENSAJE AL MANEJADOR DE PUBLICAR EVENTOS

            return Resultado.Exito<void>(doctorBloqueado);
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }
    }

}