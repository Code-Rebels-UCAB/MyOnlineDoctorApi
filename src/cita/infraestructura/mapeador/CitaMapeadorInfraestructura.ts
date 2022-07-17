
import { CitaDataDTO } from "../../aplicacion/dto/CitaDataDTO";
import { CitaPersistenciaDTO } from "../dto/CitaPersistenciaDTO";

export class CitaMapeadorInfraestructura{
    public static covertirInfraestructuraAplicacion(datos: CitaPersistenciaDTO):CitaDataDTO{

        return {
            idCita: datos.id_cita,
            idPaciente: datos.paciente.id_paciente,
            idDoctor: datos.doctor.id_doctor,
            status: datos.statuscita,
            modalidad: datos.modalidad,
            motivo: datos.motivo,
            fechaCita: datos.fechacita,
            horaCita: datos.horacita,
            duracion: datos.duracion.toString()
        };
    }

    public static covertirAplicacionInfraestructura(datos: CitaDataDTO):CitaPersistenciaDTO{
        //const horaStr = datos.horaCita.split(":");
        //var horacita = new Date(null,null,null,Number(horaStr[0]),Number(horaStr[1]));

        return {
            id_cita: datos.idCita,
            statuscita: datos.status,
            modalidad: datos.modalidad,
            motivo: datos.motivo,
            fechacita: datos.fechaCita,
            horacita: datos.horaCita,
            duracion: Number(datos.duracion),
            paciente: {id_paciente: datos.idPaciente},
            doctor: {id_doctor: datos.idDoctor}
        }
    }


}