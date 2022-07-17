import { CitaPacienteDTO } from "src/cita/aplicacion/dto/CitasPacienteDTO";
import { CitaDataDTO } from "../../aplicacion/dto/CitaDataDTO";
import { CitaPersistenciaDTO } from "../dto/CitaPersistenciaDTO";

export class CitaMapeadorInfraestructura{
    public static covertirInfraestructuraAplicacion(datos: CitaPersistenciaDTO):CitaDataDTO{

        return {
            idCita: datos.id_cita,
            idPaciente: datos.paciente,
            idDoctor: datos.doctor,
            status: datos.statuscita,
            modalidad: datos.modalidad,
            motivo: datos.motivo,
            fechaCita: datos.fechacita,
            horaCita: datos.horacita.getHours() + ':' + datos.horacita.getMinutes() ,
            duracion: datos.duracion.toString()
        }
    }

    public static covertirAplicacionInfraestructura(datos: CitaDataDTO):CitaPersistenciaDTO{
        const horaStr = datos.horaCita.split(":");
        var horacita = new Date(null,null,null,Number(horaStr[0]),Number(horaStr[1]));

        return {
            id_cita: datos.idCita,
            statuscita: datos.status,
            modalidad: datos.modalidad,
            motivo: datos.motivo,
            fechacita: datos.fechaCita,
            horacita: horacita,
            duracion: Number(datos.duracion),
            paciente: datos.idPaciente,
            doctor: datos.idDoctor
        }
    }


}