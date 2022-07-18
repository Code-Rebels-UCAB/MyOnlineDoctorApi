import { Guid } from "guid-typescript";
import { ILogger } from "../../../commun/aplicacion/Ilogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { PacienteID } from "../../../commun/dominio/values/PacienteID";
import { Calificacion } from "../../dominio/values/Calificacion";
import { CalificarDoctorDTO } from "../dtos/CalificarDoctorDTO";
import { ListadoDoctoresDTO } from "../dtos/ListadoDoctoresDTO";
import { DoctorMapeador } from "../mapeadores/DoctorMapeador";
import { IRepositorioDoctor } from "../puertos/IRepositorioDoctor";


export class CalificarDoctor implements IServicioAplicacion<CalificarDoctorDTO, void>{

    constructor(
        private readonly logger: ILogger,
        private readonly repositorioDoctor: IRepositorioDoctor,
    ){}

    async ejecutar(data: CalificarDoctorDTO): Promise<Resultado<void>> {
        try {
            const doctor = await this.repositorioDoctor.obtenerDoctorById(data.idDoctor);
             

            const doctorDominio = DoctorMapeador.covertirPersistenciaDominio(doctor);

            doctorDominio.calificarDoctor(PacienteID.crear(Guid.parse(data.idPaciente)), 
                                          Calificacion.agregarCalificacion(doctorDominio.getCalificacion(), Calificacion.crear(data.calificacionDoctor, 1)));
            
            
            //Eventos de dominio
            //doctorDominio.obtenerEventos()

            this.repositorioDoctor.calificarDoctor(data.idDoctor, doctorDominio.getCalificacion().getCalificacion(), doctorDominio.getCalificacion().getCantidad());

            this.logger.log("El Doctor: " + doctor.p_nombre + doctor.p_apellido + "fue calificado", "Con una calificacion: " + data.calificacionDoctor);
            return Resultado.Exito<void>();
        } catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado: " + data, errores.mensaje);
            return Resultado.Falla(error);
        }
    }
    
}