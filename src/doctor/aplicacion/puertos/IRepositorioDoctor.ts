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
    especialidades: string[]
    cita: string [];
    registroMedico: string[];

}


export interface IRepositorioDoctor {  
    
    //QUERYS
    obtenerDoctorByEspecialidad(especialidad: string);

    obtenerDoctorByNombre(nombre: string);

    obtenerTopDoctores();

    //Comandos
    bloquearDoctor(id: string);

    calificarDoctor(id: string, calificacion: number);


}
  