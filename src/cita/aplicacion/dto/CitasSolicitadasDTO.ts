export interface CitaSolicitadasDTO {
    id_cita: string;
    statuscita: string;
    modalidad: string;
    motivo: string;
    doctor:{
        id_doctor: string,
        p_nombre: string,
        p_apellido: string
    }
    paciente:{
        id_paciente: string,
        p_nombre: string,
        p_apellido: string
    }

}