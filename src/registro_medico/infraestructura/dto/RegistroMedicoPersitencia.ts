
export interface RegistroMedicoPersistencia {
    id_registro: string;
    examenes: string;
    historia: string;
    prescripcion: string;
    plan: string;
    diagnostico: string;
    motivo?: string;
    fechacita?:Date;
    doctor: string;
    cita: string;
    historiaMedica?: string;

}