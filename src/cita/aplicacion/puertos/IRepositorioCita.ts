import { CitaORM } from "src/cita/infraestructura/persistencia/Cita.orm";

export interface IRepositorioCita {
  //QUERYS
  obtenerTodasLasCitas();

  obtenerCitaById(id_cita: string);

  obtenerCitaByDoctor(id_doctor: string);

  obtenerCitaByPaciente(id_paciente: string);

  obtenerCitaByFecha(fecha: string);

  obtenerCitaDeDoctorByStatus(status: string, doctorid: string);

  obtenerCitasDeDoctor(doctorid: string);

  //Comandos
  crearCita(cita: CitaORM);

  actualizarStatusCita();
}
