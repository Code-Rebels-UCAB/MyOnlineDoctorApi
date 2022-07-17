import { Guid } from "guid-typescript";
import { DatosCitaVO } from "src/cita/dominio/dto/DatosCitaVO";
import { Duracion } from "src/cita/dominio/values/Duracion";
import { FechaCita } from "src/cita/dominio/values/FechaCita";
import { HoraCita } from "src/cita/dominio/values/HoraCita";
import { Modalidad } from "src/cita/dominio/values/Modalidad";
import { Motivo } from "src/cita/dominio/values/Motivo";
import { StatusCita } from "src/cita/dominio/values/StatusCita";
import { TipoCita } from "src/cita/dominio/values/TipoCita";
import { TipoModalidad } from "src/cita/dominio/values/TipoModalidad";
import { CitaID } from "src/commun/dominio/values/CitaID";
import { DoctorID } from "src/commun/dominio/values/DoctorID";
import { PacienteID } from "src/commun/dominio/values/PacienteID";
import { CitaDataDTO } from "../dto/CitaDataDTO";


export class CitaMapeador{
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
            fechaCita: data.fechaCita.fechaCita,
            horaCita: data.horaCita.horaCita.toString(),
            duracion: data.duracion.duracion.toString(),
        }
    }
}