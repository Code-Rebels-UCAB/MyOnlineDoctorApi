export interface IRepositorioCita {
  //QUERYS
  obtenerTodasLasCitas();

  obtenerCitaById(id_cita: string);

  obtenerCitaByDoctor(id_doctor: string);

  obtenerCitaByPaciente(id_paciente: string);

  obtenerCitaByFecha(fecha: string);

  obtenerCitaDeDoctorByStatus(status: string, doctorid: string);

  //Comandos
  crearCita();

  actualizarStatusCita();
}
