export interface CitaPersistencia{
    id_cita: string;
    statuscita: string;
    modalidad: string;
    motivo: string;
    fechacita: Date;
    horacita: Date;
    duracion: number;
    id_paciente: string;
    id_doctor: string;
    id_registro?: string;
}