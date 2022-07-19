export interface ListadoDoctoresDTO{
    id_doctor?: string,
    nombre?: string
    sexo?: string,
    correo?: string,
    especialidades: string[],
    foto: string,
    calificacion?: number,
}