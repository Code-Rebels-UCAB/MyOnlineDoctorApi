export interface IRepositorioPaciente {
  //QUERIES
  obtenerCantidadTotalPacientes();
  guardarTokenPaciente(pacienteid: string, tokenPaciente: string);
  obtenerPacienteById(id: string);

  obtenerPacienteByNombreorApellido(nombre: string);
}
