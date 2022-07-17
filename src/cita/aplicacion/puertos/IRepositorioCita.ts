export interface IRepositorioCita {
  //QUERYS
  obtenerTodasLasCitas();

  obtenerCitaById(id_cita: string);

  obtenerCitaByDoctor(id_doctor: string);

  obtenerCitaByPaciente(id_paciente: string);

  obtenerCitaByFecha(fecha: string);

  obtenerCitaDeDoctorByStatus(status: string, doctorid: string);

  obtenerCantidadPacientesPorDoctor(doctorId: string);

  obtenerCantidadCitasDelDiaDoctor(doctorId: string);

  //Comandos
  crearCita();

  actualizarStatusCita();
}
