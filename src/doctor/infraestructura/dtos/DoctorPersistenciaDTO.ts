import { EspecialidadORM } from "../persistencia/Especialidad.orm";

export interface DoctorPersistenciaDTO{

    id_doctor: string;
    p_nombre: string;
    p_apellido: string;
    sexo: string;
    correo: string;
    password: string;
    latitud: string;
    longitud: string;
    foto: string;
    calificacion: number;
    cantidad_calificacion: number;
    status: string;
    especialidades: EspecialidadORM[]
    cita: string [];
    registroMedico: string[];

}
