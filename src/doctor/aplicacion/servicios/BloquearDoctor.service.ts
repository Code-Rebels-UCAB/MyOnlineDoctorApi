import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioDoctor } from "../puertos/IRepositorioDoctor";
import { DoctorMapeador } from "../mapeadores/DoctorMapeador";
import { BloquearCita } from "../../../cita/aplicacion/servicios/BloquearCita.service"
import { CitasDoctor } from "../../../cita/aplicacion/servicios/CitasDoctor.service";


export class BloquearDoctor implements IServicioAplicacion<string, void>{

    constructor(
        private readonly logger: ILogger,
        private readonly repositorioDoctor: IRepositorioDoctor,
        private readonly bloquearCita: BloquearCita,
        private readonly citasDoctor: CitasDoctor,
    ) {}

    async ejecutar(doctorId: string): Promise<Resultado<void>> {

        try{
            //SE OBTIENEN LOS DATOS DEL DOCTOR 
            const datosDoctor = await this.repositorioDoctor.obtenerDoctorById(doctorId);
            //SE MAPEAN ESOS DATOS Y OBTIENE EL DOCTOR DE DOMINIO
            const doctor = DoctorMapeador.covertirPersistenciaDominio(datosDoctor);

            //SE GENERA EL EVENTO DE DOMINIO
            doctor.bloquearDoctor();
            //doctor.obtenerEventos();
            //doctor.limpiarEventos();

            //BLOQUEAR AL DOCTOR
            const doctorBloqueado = await this.repositorioDoctor.bloquearDoctor(doctor.obtenerIdentificador().getDoctorID().toString())
            this.logger.log("Doctor: " + doctor.getNombreDoctor().getNombre() + ' ' + doctor.getNombreDoctor().getApellido(), 'Bloqueado');

            //SE COLABORA CON EL SERVICIO DE APLICACION CITASDOCTOR, PARA OBTENER TODAS LAS CITAS DEL DOCTOR 
            const citas = await this.citasDoctor.ejecutar(doctor.obtenerIdentificador().getDoctorID().toString());
            
            //SE COMPRUEBA SI EL DOCTOR TIENE CITAS
            if (citas.valor.length > 0) {
                //SE FILTRAN LAS CITAS, PARA OBTENER LAS QUE NO TENGAN EL ESTADO DE FINALIZADA O INICIADA
                const citasFiltradas = citas.valor.filter( (cita) => { 
                    if (cita.statuscita != 'Finalizada' && cita.statuscita != 'Iniciada') {
                        return true;
                    }
                });
                //SE COLABORA CON EL SERVICIO DE APLICACION BLOQUEAR CITAS, PARA BLOQUEAR LAS CITAS DEL DOCTOR BLOQUEADO (QUE NO TENGAN EL ESTADO DE FINALIZADA O INICIADA)
                if (citasFiltradas.length > 0) {
                    for (const cita of citasFiltradas) {
                        await this.bloquearCita.ejecutar(cita.id_cita);
                    }   
                } 
            }
            

            return Resultado.Exito<void>(doctorBloqueado);
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }
    }

}