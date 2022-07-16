import { CitaID } from "src/commun/dominio/values/CitaID";
import { DoctorID } from "src/commun/dominio/values/DoctorID";
import { RegistroMedicoID } from "src/commun/dominio/values/RegistroMedicoID";
import { Diagnostico } from "../values/Diagnostico";
import { Examenes } from "../values/Examenes";
import { Historia } from "../values/Historia";
import { Plan } from "../values/Plan";
import { Prescripcion } from "../values/Prescripcion";

export interface DatosRegistroMedicoVO {
    idRegistroMedico: RegistroMedicoID;
    idCita: CitaID;
    idDoctor: DoctorID;
    examenes: Examenes;
    plan: Plan;
    historia: Historia;
    prescripcion: Prescripcion;
    diagnostico: Diagnostico;
}