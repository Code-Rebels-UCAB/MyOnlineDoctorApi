export interface PacienteAutenticacionDTO {
    id_paciente: string;
    p_nombre: string;
    s_nombre?: string;
    p_apellido: string;
    s_apellido?: string;
    fecha_nacimiento: string;
    telefono: string;
    correo: string;
    sexo: string;
    altura: string;
    peso: string;
    contrasena: string;
    status_suscripcion: string;
    alergia?: string;
    antecedentes?: string;
    operacion?: string;
    token_Firebase?: string;
}