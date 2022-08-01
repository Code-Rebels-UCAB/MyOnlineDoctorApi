export interface ListadoRegistrosMedicoDTO {
    id_registro: string,
    examenes: string,
    historia: string,
    prescripcion: string,
    plan: string,
    diagnostico?: string;
    motivo: string,
    fechaCita: string,
    modalidad?: string;
    id_doctor: string,
    nombreDoctor?: string;
    sexoDoctor: string,
    id_cita: string,
    id_paciente: string,
    id_historia: string,
}
  
  