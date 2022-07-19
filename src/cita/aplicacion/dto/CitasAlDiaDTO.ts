export interface CitasAlDiaDTO {
    id_cita: string;
    statuscita: string;
    modalidad: string;
    motivo: string;
    fechaCita: string;
    horaCita: string;
    duracion: string;
    paciente:{
        id_paciente: string,
        p_nombre: string,
        p_apellido: string
    }

}