import { CitaDataDTO } from "src/cita/aplicacion/dto/CitaDataDTO";
import { CitaPersistenciaDTO } from "../dto/CitaPersistenciaDTO";

export class CitaMapeador{
    public static covertirInfraestructuraAplicacion(datos: CitaPersistenciaDTO):CitaDataDTO{

        return {
            idCita: datos.id_cita,
            idPaciente: datos.paciente,
            idDoctor: datos.doctor,
            status: datos.statuscita,
            modalidad: datos.modalidad,
            motivo: datos.motivo,
            fechaCita: datos.fechacita,
            horaCita: datos.horacita,
            duracion: datos.duracion.toString()
        }
    }

    public static covertirAplicacionInfraestructura(datos: CitaDataDTO):CitaPersistenciaDTO{

        return {
            id_cita: datos.idCita,
            statuscita: datos.status,
            modalidad: datos.modalidad,
            motivo: datos.motivo,
            fechacita: datos.fechaCita,
            horacita: datos.horaCita,
            duracion: Number(datos.duracion),
            paciente: datos.idPaciente,
            doctor: datos.idDoctor
        }
    }


}