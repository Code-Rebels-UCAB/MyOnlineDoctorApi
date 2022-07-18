import { Guid } from "guid-typescript";
import { DatosCitaVO } from "../../dominio/dto/DatosCitaVO";
import { Duracion } from "../../dominio/values/Duracion";
import { FechaCita } from "../../dominio/values/FechaCita";
import { HoraCita } from "../../dominio/values/HoraCita";
import { Modalidad } from "../../dominio/values/Modalidad";
import { Motivo } from "../../dominio/values/Motivo";
import { StatusCita } from "../../dominio/values/StatusCita";
import { TipoCita } from "../../dominio/values/TipoCita";
import { TipoModalidad } from "../../dominio/values/TipoModalidad";
import { CitaID } from "../../../commun/dominio/values/CitaID";
import { DoctorID } from "../../../commun/dominio/values/DoctorID";
import { PacienteID } from "../../../commun/dominio/values/PacienteID";
import { CitaDataDTO } from "../dto/CitaDataDTO";
import { CitaPersistenciaDTO } from "src/cita/infraestructura/dto/CitaPersistenciaDTO";


export class CitaMapeador{

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

    public static convertirAplicacionDominio( data:CitaDataDTO ):DatosCitaVO {
        const hora = data.horaCita.split(":");
        return {
            idCita: CitaID.crear(Guid.parse(data.idCita)),
            idPaciente: PacienteID.crear(Guid.parse(data.idPaciente)),
            idDoctor: DoctorID.crear(Guid.parse(data.idDoctor)),
            status: StatusCita.crear(TipoCita[data.status]),
            modalidad: Modalidad.crear(TipoModalidad[data.modalidad]),
            motivo: Motivo.crear(data.motivo),
            fechaCita: FechaCita.crear(data.fechaCita),
            horaCita: HoraCita.crear(Number(hora[0]), Number(hora[1])),
            duracion: Duracion.crear(Number(data.duracion)),
        }
    }

    public static convertirDominioAplicacion( data:DatosCitaVO):CitaDataDTO{
        return {
            idCita: data.idCita.getCitaID().toString(),
            idPaciente: data.idPaciente.getPacienteID().toString(),
            idDoctor: data.idDoctor.getDoctorID().toString(),
            status: data.status.statusCita.toString(),
            modalidad: data.modalidad.modalidad.toString(),
            motivo: data.motivo.motivo.toString(),
            fechaCita: data.fechaCita.fechaCita.toString(),
            horaCita: data.horaCita.horaCita.toString(),
            duracion: data.duracion.duracion.toString(),
        }
    }
}