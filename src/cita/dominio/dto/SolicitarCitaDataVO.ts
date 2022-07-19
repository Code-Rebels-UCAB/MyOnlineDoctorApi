import { DoctorID } from "../../../commun/dominio/values/DoctorID";
import { PacienteID } from "../../../commun/dominio/values/PacienteID";
import { Modalidad } from "../values/Modalidad";
import { Motivo } from "../values/Motivo";

export interface SolicitarCitaDataVO {
    modalidad?: Modalidad,
    motivo?: Motivo,
    idPaciente?: PacienteID,
    idDoctor?: DoctorID,
}