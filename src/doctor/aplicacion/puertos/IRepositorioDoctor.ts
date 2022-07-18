

export interface IRepositorioDoctor {  
    
    //QUERYS
    obtenerDoctorByEspecialidad(especialidad: string);

    obtenerDoctorByNombreorApellido(nombre: string);

    obtenerTopDoctores();

    obtenerDoctorById(id: string);

    //Comandos
    bloquearDoctor(id: string);

    calificarDoctor(id: string, calificacion: number);


}
  