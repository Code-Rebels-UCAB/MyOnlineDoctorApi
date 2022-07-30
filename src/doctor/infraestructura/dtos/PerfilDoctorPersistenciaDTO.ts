import { EspecialidadORM } from "../persistencia/Especialidad.orm";

export interface PerfilDoctorPersistenciaDTO{
    p_nombre: string,
    p_apellido: string,
    sexo: string,
    foto: string,
    calificacion?: number,
    especialidades: EspecialidadORM[],
}