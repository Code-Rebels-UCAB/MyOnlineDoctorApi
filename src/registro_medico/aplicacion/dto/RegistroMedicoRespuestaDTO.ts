export interface RegistroMedicoRespuestaDTO {
    id_registro: string,
    examenes?: string,
    historia?: string,
    prescripcion?: string,
    plan?: string,
    diagnostico?: string,
    motivo?: string,
    fechaCita?: string,
    id_doctor?: string,
    id_cita?: string,
}