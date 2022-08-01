import { ConsultarPacienteRespuestaDTO } from "../dto/queries/ConsultarPaciente.query";

export interface IRepositorioPaciente {
  
  registrarPaciente(pacienteNuevo: ConsultarPacienteRespuestaDTO);

  //QUERIES
  obtenerCantidadTotalPacientes();
  guardarTokenPaciente(pacienteid: string, tokenPaciente: string);
  obtenerPacienteById(id: string);
  buscarDatosIniciarSesionPaciente(correoPaciente: string);
  obtenerPacienteByNombreorApellido(nombre: string);
  obtenerPacienteByTelefono(telefono: string);
}

export const IRepositorioPaciente = Symbol("IRepositorioPaciente");