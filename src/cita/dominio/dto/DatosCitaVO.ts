import { CitaID } from "src/commun/dominio/values/CitaID";
import { DoctorID } from "src/commun/dominio/values/DoctorID";
import { PacienteID } from "src/commun/dominio/values/PacienteID";
import { Duracion } from "../values/Duracion";
import { FechaCita } from "../values/FechaCita";
import { HoraCita } from "../values/HoraCita";
import { Modalidad } from "../values/Modalidad";
import { Motivo } from "../values/Motivo";
import { StatusCita } from "../values/StatusCita";

export interface DatosCitaVO {
    idCita: CitaID,
    status: StatusCita,
    modalidad: Modalidad,
    motivo: Motivo,
    idPaciente: PacienteID,
    idDoctor: DoctorID,
    fechaCita?: FechaCita,
    horaCita?: HoraCita,
    duracion?: Duracion,
}