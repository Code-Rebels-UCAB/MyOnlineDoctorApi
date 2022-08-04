export interface DoctorAutenticacionDTO {
    id_doctor: string;
    p_nombre: string;
    p_apellido: string;
    sexo: string;
    correo: string;
    contrasena: string;
    latitud: string;
    longitud: string;    
    foto: string;
    calificacion: number;
    cantidad_calificacion: number;
    status: string;
    token_Firebase?: string;
}