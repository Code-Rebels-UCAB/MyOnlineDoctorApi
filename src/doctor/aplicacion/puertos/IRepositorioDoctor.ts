import { CalificarDoctorDTO } from "../dtos/CalificarDoctorDTO";


export interface IRepositorioDoctor {  
    
    //QUERYS
    obtenerDoctorByEspecialidad(especialidad: string);

    obtenerDoctorByNombreorApellido(nombre: string);

    obtenerTopDoctores();

    obtenerDoctorById(id: string);

    obtenerTodosDoctores();
    
    //Comandos
    bloquearDoctor(id: string);

    calificarDoctor(id: string, puntaje: number, cantidad: number);


}
  