export interface IRepositorioPaciente {
  //QUERIES
  obtenerCantidadTotalPacientes();
  guardarTokenPaciente(pacienteid: string, tokenPaciente: string);
  obtenerPacienteById(id: string);

  obtenerPacienteByNombreorApellido(nombre: string);
  obtenerPacienteByTelefono(telefono: string);

  //COMANDOS
  bloquearPaciente(id: string);
  suspenderPaciente(id: string);
}
