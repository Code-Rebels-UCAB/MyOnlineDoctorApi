export interface CitaDataDTO {
    idCita: string;
    idPaciente: string;
    idDoctor: string;
    status: string;
    modalidad: string;
    motivo: string;
    fechaCita: Date;
    horaCita: Date;
    duracion: string;
}