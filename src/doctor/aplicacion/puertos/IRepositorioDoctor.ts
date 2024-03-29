import { CalificarDoctorDTO } from '../dtos/CalificarDoctorDTO';

export interface IRepositorioDoctor {
  //QUERYS
  obtenerDoctorByEspecialidad(especialidad: string);

  obtenerDoctorByNombreorApellido(nombre: string);

  obtenerTopDoctores();

  obtenerDoctorById(id: string);

  obtenerTodosDoctores();
  
  obtenerDatosDoctor(id: string);

  obtenerDoctorNoti(id_doctor: string);
  
  //Comandos
  bloquearDoctor(id: string);

  calificarDoctor(id: string, puntaje: number, cantidad: number);

  autenticarDoctor(correo: string, password: string);
}
