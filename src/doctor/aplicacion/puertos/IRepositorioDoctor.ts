

export interface IRepositorioDoctor {  
    
    //QUERYS
    obtenerDoctorByEspecialidad(especialidad: string);

    obtenerDoctorByNombre(nombre: string);

    obtenerTopDoctores();

    //Comandos
    bloquearDoctor(id: string);

    calificarDoctor(id: string, calificacion: number);


}
  