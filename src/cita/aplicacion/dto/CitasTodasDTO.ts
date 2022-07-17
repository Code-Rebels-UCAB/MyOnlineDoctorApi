export interface CitaTodasDTO {
    id_cita: string;
    statuscita: string;
    modalidad: string;
    horacita: string;
    paciente:{
        id_paciente: string,
        p_nombre: string,
        p_apellido: string
    }

}