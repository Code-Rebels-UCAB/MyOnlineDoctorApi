export interface PerfilDoctorDTO{
    id_doctor?: string,
    nombre: string
    sexo: string,
    especialidades: string[],
    foto: string,
    calificacion?: number,
}