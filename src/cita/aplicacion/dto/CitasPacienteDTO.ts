export interface CitaPacienteDTO {
    id_cita?: string,
    statuscita?: string,
    modalidad?: string,
    fechaCita?: string,
    duracion?: number,
    horacita?: string,
    id_paciente?: string,
    doctor?:{
        id_doctor?: string,
        nombreDoctor?:string
    }

}