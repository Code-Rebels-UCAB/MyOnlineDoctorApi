
export interface ConsultarPacienteQueryDTO {
    idPaciente: string;
}

export interface ConsultarPacienteRespuestaDTO {
    idPaciente: string;
    primer_nombre: string;
    segundo_nombre?: string;
    primer_apellido: string;
    segundo_apellido?: string;
    fechaNacimiento: Date;
    telefono: string;
    email: string;
    genero: string;
    altura: number;
    peso: number;
    password: string;
    statusSuscripcion: string;
    alergia?: string;
    antecedentes?: string;
    operaciones?: string;
}