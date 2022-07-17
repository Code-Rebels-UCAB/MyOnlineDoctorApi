export interface CitaPacienteDTO {
    id_cita?: string;
    statuscita?: string;
    modalidad?: string;
    horacita?: string;
    id_paciente?: string
    doctor?:{
        id_doctor?: string,
        p_nombre?: string,
        p_apellido?: string,
    }

}