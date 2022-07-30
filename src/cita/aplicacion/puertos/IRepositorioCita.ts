import { SolicitarCitaPersistenciaDTO } from "../../infraestructura/persistencia/SolicitarCitaPersistenciaDTO";


export interface IRepositorioCita {
  //QUERYS
  obtenerTodasLasCitas();

  obtenerCitaById(id_cita: string);

  obtenerCitaByDoctor(id_doctor: string);

  obtenerCitaByPaciente(id_paciente: string);

  obtenerCitaByFecha(fecha: string);

  obtenerCitaDeDoctorByStatus(status: string, doctorid: string);

  obtenerCitasDeDoctor(doctorid: string);
  
  obtenerCitasDelDiaDoctor(doctorId: string);

  obtenerCantidadPacientesPorDoctor(doctorId: string);

  obtenerCantidadCitasDelDiaDoctor(doctorId: string);

  obtenerCitaIniciada(citaid: string);

  obtenerTokenF(citaid: string);

  obtenerDoctorCita(citaid: string);

  //Comandos
  crearCita(cita: SolicitarCitaPersistenciaDTO);

  actualizarStatusCita(citaid: string, status: string);

  actualizarCitaAgendada(citaid: string, fecha: string, hora: string, duracion: string);

  actualizarDatosVideollamadaCita(citaid: string, nombreCanal: string, tokenCita: string);
}
